import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import { Profile } from 'src/app/Interfaces/profile';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';




@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {

  date: Date = new Date();
  roleId: any;
  sname: any;
  snames?: any;
  nameOptions: SelectItem[];
  detail: string;
  position: any;
  positionOptions: SelectItem[];

  class: any;
  classes?: any;
  elections?: any;
  classOptions: SelectItem[];

  section: any;
  sections?: any;
  sectionOptions: SelectItem[];

  districtOptions: SelectItem[];

  masterData?: any = [];
  MRowId = 0;

  data: any = [];
  cols: any;
  login_user: User;
  @BlockUI() blockUI: NgBlockUI;

  @ViewChild('f', { static: false }) _NomineeForm: NgForm;

  constructor(private restApiService: RestAPIService, private http: HttpClient, private authService: AuthService,
    private messageService: MessageService, private masterService: MasterService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.masterService.getMaster('');
    this.cols = [
      { field: 'FirstName', header: 'Nominee Name' },
      { field: 'ElectionDate', header: 'Election Date' },
      { field: 'ElectionName', header: 'ElectionName' },
    ];

    // if (this.login_user.roleId === 5) {
    //   this.positionOptions = [
    //     { label: '-select-', value: '-select-' },
    //     { label: 'Class Representative', value: 'Class Representative' },
    //     // { label: 'School Representative', value: 'School Representative' },

    //   ];
    // }else{
    //   this.positionOptions = [
    //     { label: '-select-', value: '-select-' },
    //     { label: 'Class Representative', value: 'Class Representative' },
    //     { label: 'School Representative', value: 'School Representative' },
    //   ];

    // }


  }

  onSubmit() {

    const params = {
      'RowId': this.MRowId,
      'SchoolID': this.login_user.schoolId,
      'RoleId': this.login_user.roleId,
      'ElectionID': this.position,
      'NomineeID': this.sname.value,
      'ElectionDate': this.datepipe.transform(this.date, 'MM/dd/yyyy'),
      'ClassId': this.class.value,
      'SectionId': this.section.value,
      'Flag': true

    };
    console.log(params);
    this.restApiService.post(PathConstants.Nominee_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
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
          if((this.login_user.roleId * 1) === 3) {
            if((e.code * 1) === 1) {
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
  onSelect2() {
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ClassId': this.class.value,
      'SectionId': this.section.value


    }
    console.log(params)
    this.restApiService.getByParameters(PathConstants.Nomineeview_Get, params).subscribe(data => {
      if (data !== undefined) {
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
      this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
        if (res !== null && res !== undefined && res.length !== 0) {
          console.log(res);
          this.data = res;
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ElectionnameSelect
          });

        }
      });
    }
  }
  clear() {
    this._NomineeForm.reset();
    this._NomineeForm.form.markAsUntouched();
    this._NomineeForm.form.markAsPristine();
    this.position = "",
      this.class = "",
      this.section = "",
      this.sname = "",
      this.date = new Date();
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.date = selectedRow.ElectionDate;
    this.position = selectedRow.ElectionName;
    this.positionOptions = [{ label: selectedRow.position, value: selectedRow.ElectionName }];
  }
}
