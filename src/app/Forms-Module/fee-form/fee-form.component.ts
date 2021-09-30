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



@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.css']
})
export class FeeFormComponent implements OnInit {
  dueDate: Date = new Date();
  receiptOptions: SelectItem[];
  studentOptions: SelectItem[];
  receiptBook: any;
  class: any;
  section: any;
  feename: any;
  actualamount: any;
  paidamount: any;
  outstanding: any;
  paying: any;
  fine: any;
  data: any = []; 
  cols: any;
  MRowId=0;
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
  admnNo: any;
  today: any;
  total: any;
  login_user: User;
  classOptions: SelectItem[];
  sectionOptions:  SelectItem[];
  // master
  sections?: any;
  classes?: any;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _FeeForm: NgForm;
 


  constructor(private restApiService: RestAPIService, private authService: AuthService,private messageService: MessageService, private datePipe: DatePipe, private masterService: MasterService) { }

  ngOnInit(): void {
    this.logged_user = this.authService.UserInfo;
    this.receiptOptions = [
      { label: 'School Fees', value: '01' },
      { label: 'Tuition Fees', value: '02' },
      { label: 'Term Fees', value: '03' },
    ];
    this.studentOptions = [
      { label: 'Arun Kumar', value: '01' },
      { label: 'Reethvin', value: '02' }
    ];
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
  
    this.cols = [
      { field: 'SlNo', header: 'Slno'},
      { field: 'RowId', header: 'ID' },
      { field: 'duedate', header: 'Due Date' },
      { field: 'ReceiptBook', header: 'Receipt Book' },
      { field: 'FeeName', header: 'Fee Name' },
      { field: 'ActualAmount', header: 'Actual Amount' },
      { field: 'PaidAmount', header: 'Paid Amount' },
      { field: 'OutstandingAmount', header: 'Outstanding Amount' },
      { field: 'PayingAmount', header: 'Paying Amount' },
      { field: 'FineAmount', header: 'Fine' }
    ];
    
    // this.generateReceipt(null)
    this.login_user = this.authService.UserInfo;
  }

  onFileUpload($event, id) {
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
  }
  onSelect(type) {
    let classSelection = [];
    let sectionSelection = [];
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
    }
  }

  onSubmit() {
    const params = {
      'RowId': this.MRowId,
      'Academic':0,
      'SchoolID': this.login_user.schoolId,
      'StudentId':this.login_user.id,      
      'Class': this.login_user.classId,     
      'duedate': this.datePipe.transform(this.dueDate, 'MM/dd/yyyy') ,
      'ReceiptBook': this.receiptBook.label,
      'FeeName': this.feename,
      'ActualAmount': this.actualamount,
      'PaidAmount': this.paidamount,
      'OutstandingAmount': this.outstanding,
      'PayingAmount': this.paying,
      'FineAmount': this.fine,
      'Flag' : true
  
    };
    this.restApiService.post(PathConstants.Fee_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.generateReceipt(params);
          this.clear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.blockUI.stop(); 
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
        } else {
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
    const params = {
      'schoolID': this.login_user.schoolId,
      'studentID': this.login_user.id,
      'yearID': '',
      'type': 0
    }
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      let sno = 0;
      this.data.forEach(s => {
        sno += 1;
        s.SlNo = sno;
      });
      }
    });
  
  }
  clear() {
    this._FeeForm.reset();
    
  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.dueDate=selectedRow.duedate;
    this.receiptBook=selectedRow.ReceiptBook;
    this.feename=selectedRow.FeeName;
    this.actualamount=selectedRow.ActualAmount;
    this.paidamount=selectedRow.PaidAmount;
    this.outstanding=selectedRow.OutstandingAmount;
    this.paying=selectedRow.PayingAmount;
    this.fine=selectedRow.FineAmount;
  }
// feereceipt method
  generateReceipt(data) {
    this.showReceipt = true;
    this.schoolName = this.logged_user.schoolname;
    this.schoolAddress = this.logged_user.taluk + '-' + this.logged_user.pincode;
    this.studentName = this.logged_user.username;
    this.class = this.logged_user.class + ' - ' + this.logged_user.section;
    this.parentName = this.logged_user.fathername;
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.total = data.PaidAmount,
    this.receiptData.push({
      'feeparticulars': data.FeeName,
      'totalamount': data.ActualAmount,
      'paidamount' : data.PaidAmount
    })
    
  }
  
 

}
