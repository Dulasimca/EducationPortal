import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.css']
})
export class FeeFormComponent implements OnInit {
  dueDate: Date = new Date();
  receiptOptions: SelectItem[];
  studentOptions: SelectItem[];
  data: any = [];
  student: any;
  receiptBook: number;
  class: any;
  section: any;
  feename: any;
  actualamount: any;
  paidamount: any;
  outstanding: any;
  paying: any;
  fine: any;
  cols: any;
  students: any;
  feeTypes: any;
  MRowId = 0;
  // feereceipt 
  receiptCols: any;
  receiptData: any = [];
  showReceipt: boolean;
  receiptYear: any;
  logged_user: User;
  receiptNo: any;
  schoolName: any;
  taluk: any;
  schoolAddress: any;
  schoolContact: number;
  studentName: string;
  parentName: string;
  date: number;
  classSection: string;
  admnNo: any;
  today: any;
  total: any;
  login_user: User;
  classOptions: SelectItem[];
  sectionOptions: SelectItem[];
  // master
  sections?: any;
  classes?: any;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _FeeForm: NgForm;
  loading: boolean;
  showtable: boolean;

  constructor(private restApiService: RestAPIService, private authService: AuthService, private messageService: MessageService, private datePipe: DatePipe, private masterService: MasterService) { }

  ngOnInit(): void {
    this.logged_user = this.authService.UserInfo;
    this.restApiService.get(PathConstants.FeeType_Get).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.feeTypes = res;
      }
    });
    this.masterService.getMaster('');
    this.cols = TableConstants.FeesDetailsColumns;
    this.login_user = this.authService.UserInfo;
  }

  loadStudents() {
    this.students = [];
    this.student = null;
    this.studentOptions = [];
    if (this.class !== undefined && this.class !== null && this.section !== undefined &&
      this.section !== null) {
      const params = { 'ClassId': this.class.value, 'SectionId': this.section.value };
      this.restApiService.getByParameters(PathConstants.StudentList_Get, params).subscribe(res => {
        if (res !== undefined && res !== null && res.length !== 0) {
          this.students = res;
        }
      })
    }
  }

  onFileUpload($event, id) {
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
  }
  onSelect(type) {
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    let classSelection = [];
    let sectionSelection = [];
    let studentSelection = [];
    let feeTypeSelection = [];
    switch (type) {
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        break;
      case 'S':
        this.sections.forEach(s => {
          sectionSelection.push({ label: s.name, value: s.code })
        });
        this.sectionOptions = sectionSelection;
        this.sectionOptions.unshift({ label: '-select', value: null });
        break;
      case 'SN':
        this.students.forEach(n => {
          studentSelection.push({ label: n.FirstName, value: n.slno })
        });
        this.studentOptions = studentSelection;
        this.studentOptions.unshift({ label: '-select', value: null });
        break;
      case 'FT':
        this.feeTypes.forEach(n => {
          feeTypeSelection.push({ label: n.Name, value: n.Id })
        });
        this.receiptOptions = feeTypeSelection;
        this.receiptOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onSubmit() {
    this.blockUI.start();
    const params = {
      'RowId': this.MRowId,
      'Academic': 0,
      'SchoolID': this.login_user.schoolId,
      'Student': this.student.label,
      'StudentId': this.student.value,
      'Class': this.class.label,
      'ClassId': this.class.value,
      'Section': this.section.label,
      'SectionId': this.section.value,
      'duedate': this.datePipe.transform(this.dueDate, 'MM/dd/yyyy'),
      'ReceiptBook': this.receiptBook,
      'FeeName': this.feename,
      'ActualAmount': this.actualamount,
      'PaidAmount': this.paidamount,
      'OutstandingAmount': this.outstanding,
      'PayingAmount': this.paying,
      'FineAmount': this.fine,
      'Flag': true
    };
    this.restApiService.post(PathConstants.Fee_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          this.receiptData = [];
          this.blockUI.stop();
          this.generateReceipt(params);
          this.clear();
          this.onView();
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      } else {
        this.blockUI.stop();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      this.blockUI.stop();
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }

  onView() {
    this.showtable =true;
    this.data = [];
    this.loading = true;
    const params = {
      'schoolID': this.login_user.schoolId,
    }
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.data = res;
        this.loading = false;
      } else {
        this.showtable = false;
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    });
  }

  clear() {
    this._FeeForm.reset();
    this.receiptData = [];
    this.class = null;
    this.classOptions = [];
    this.sections = null;
    this.sectionOptions = [];
    this.studentName = null;
    this.studentOptions = [];

  }

  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.dueDate = selectedRow.duedate;
    this.receiptBook = selectedRow.FeeTypeId;
    this.receiptOptions = [{ label: selectedRow.FeeType, value: selectedRow.FeeTypeId }];
    this.feename = selectedRow.FeeName;
    this.actualamount = selectedRow.ActualAmount;
    this.paidamount = selectedRow.PaidAmount;
    this.outstanding = selectedRow.OutstandingAmount;
    this.paying = selectedRow.PayingAmount;
    this.fine = selectedRow.FineAmount;
    this.section = { label: selectedRow.Section, value: selectedRow.SectionId };
    this.sectionOptions = [{ label: selectedRow.Section, value: selectedRow.SectionId }];
    this.class = { label: selectedRow.Class, value: selectedRow.ClassId };
    this.classOptions = [{ label: selectedRow.Class, value: selectedRow.ClassId }];
    this.loadStudents();
    this.student = { label: selectedRow.FirstName, value: selectedRow.StudentId };
    this.studentOptions = [{ label: selectedRow.FirstName, value: selectedRow.StudentId }];
  }
  // feereceipt method
  generateReceipt(data) {
    this.schoolName = this.logged_user.schoolname;
    this.schoolAddress = this.logged_user.taluk + '-' + this.logged_user.pincode;
    this.studentName = data.Student;
    this.classSection = data.Class + ' - ' + data.Section;
    this.parentName = this.logged_user.fathername;
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.total = data.PaidAmount,
      this.receiptNo = data.RowId,
      this.receiptData.push({
        'feeparticulars': data.FeeName,
        'totalamount': data.ActualAmount,
        'paidamount': data.PaidAmount
      })
    this.showReceipt = true;
  }
}
