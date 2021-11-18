import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  roleId: number;
  candidateId: number;
  snames?: any;
  nameOptions: SelectItem[];
  detail: string;
  position: number;
  positionOptions: SelectItem[];
  class: number;
  classes?: any;
  elections?: any;
  classOptions: SelectItem[];
  section: number;
  sections?: any;
  sectionOptions: SelectItem[];
  districtOptions: SelectItem[];
  masterData?: any = [];
  MRowId = 0;
  data: any = [];
  cols: any;
  login_user: User;
  loading: boolean;
  minDate: Date = new Date();
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _NomineeForm: NgForm;

  constructor(private restApiService: RestAPIService, private http: HttpClient, private authService: AuthService,
    private messageService: MessageService, private masterService: MasterService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.masterService.getMaster('');
    this.cols = TableConstants.NomineeFormColumns;
  }

  onSubmit() {
    const params = {
      'RowId': this.MRowId,
      'SchoolID': this.login_user.schoolId,
      'RoleId': this.login_user.roleId,
      'ElectionID': this.position,
      'NomineeID': this.candidateId,
      'ElectionDate': this.datepipe.transform(this.startDate, 'MM/dd/yyyy'),
      'ElectionEndDate': this.datepipe.transform(this.endDate, 'MM/dd/yyyy'),
      'ClassId': this.class,
      'SectionId': this.section,
      'Flag': true
    };
    this.restApiService.post(PathConstants.Nominee_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
       //   var successMsg = (this.MRowId === 0) ? ResponseMessage.SuccessMessage : ResponseMessage.UpdateSucess;
          this.blockUI.stop();
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
        this.blockUI.stop();
        this.clear();
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

  onSelect(type) {
    this.classes = this.masterService.getMaster('C');
    this.sections = this.masterService.getMaster('S');
    this.elections = this.masterService.getMaster('EN');
    let classSelection = [];
    let sectionSelection = [];
    let electionSelection = [];

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
      case 'EN':
        this.elections.forEach(e => {
          if ((this.login_user.roleId * 1) === 3) {
            if ((e.code * 1) === 1) {
              electionSelection.push({ label: e.name, value: e.code })
            }
          } else {
            electionSelection.push({ label: e.name, value: e.code })
          }
        });
        this.positionOptions = electionSelection;
        this.positionOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  loadStudents() {
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ClassId': this.class,
      'SectionId': this.section
    }
    this.restApiService.getByParameters(PathConstants.Nomineeview_Get, params).subscribe(data => {
      if (data !== undefined && data !== null) {
        let nameSelection = [];
        this.snames = data;
        this.snames.forEach(y => {
          nameSelection.push({ label: y.FirstName, value: y.slno });
        });
        this.nameOptions = nameSelection;
        this.nameOptions.unshift({ label: '-select', value: null });
      }
    })
  }

  onView() {
    this.data = [];
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ElectionID': this.position
    }
    if (this.position !== undefined && this.position !== null) {
      this.loading = true;
      this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
        if (res !== null && res !== undefined && res.length !== 0) {
          res.forEach(r => {
            r.Class = r.ClassName + ' - ' + r.SectionName;
            r.startDate = this.datepipe.transform(r.ElectionDate, 'dd/MM/yyyy');
            r.endDate = this.datepipe.transform(r.ElectionEndDate, 'dd/MM/yyyy');
          })
          this.data = res;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      });
    } else {
      this.messageService.clear();
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
        summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ElectionnameSelect
      });
    }
  }

  clear() {
    this._NomineeForm.reset();
    this._NomineeForm.form.markAsUntouched();
    this._NomineeForm.form.markAsPristine();
    this.position = null;
    this.positionOptions = [];
    this.class = null;
    this.classOptions = [];
    this.section = null;
    this.sectionOptions = [];
    this.candidateId = null;
    this.nameOptions = [];
    this.startDate = new Date();
    this.endDate = new Date();
    this.data = [];
  }

  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.startDate = new Date(selectedRow.ElectionDate);
    this.endDate = new Date(selectedRow.ElectionEndDate);
    this.position = selectedRow.ElectionID;
    this.positionOptions = [{ label: selectedRow.ElectionName, value: selectedRow.ElectionID }];
    this.class = selectedRow.ClassId;
    this.classOptions = [{ label: selectedRow.ClassName, value: selectedRow.ClassId }];
    this.section = selectedRow.SectionId;
    this.sectionOptions = [{ label: selectedRow.SectionName, value: selectedRow.SectionId }];
    this.candidateId = selectedRow.NomineeID;
    this.nameOptions = [{ label: selectedRow.FirstName, value: selectedRow.NomineeID }];
  }
}
