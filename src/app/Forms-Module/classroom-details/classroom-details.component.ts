import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {
  duration: any;
  subjectOptions: SelectItem[];
  subject: number;
  meetingDate: Date;
  meetingTime: Date;
  sectionOptions: SelectItem[];
  section: number;
  classOptions: SelectItem[];
  class: number;
  disableSubject: boolean;
  login_user: User;
  sections?: any;
  classes?: any;
  subjects?: any;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _classroomForm: NgForm;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.masterService.getMaster('');
  }

  onSelect(type) {
    this.subjects = this.masterService.getMaster('SB');
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    let classSelection = [];
    let sectionSelection = [];
    let subjectSelection = [];
    switch (type) {
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        if(this.class !== undefined && this.class !== null) {
          this.disableSubject = false;
        } else {
          this.disableSubject = true;
        }
        break;
      case 'S':
        this.sections.forEach(s => {
          sectionSelection.push({ label: s.name, value: s.code })
        });
        this.sectionOptions = sectionSelection;
        this.sectionOptions.unshift({ label: '-select', value: null });
        break;
        case 'SB':
        this.subjects.forEach(c => {
          subjectSelection.push({ label: c.name, value: c.code })
        });
        this.subjectOptions = subjectSelection;
        this.subjectOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onSave() {
    this.blockUI.start();
    this.messageService.clear();
    const params = {
      'ClassId': this.class,
      'SectionCode': this.section,
      'MeetingDate': this.datePipe.transform(this.meetingDate, 'yyyy-MM-dd'),
      'SchoolId': this.login_user.schoolId,
      'Duration': this.duration,
      'Topics': this.subject,
      'MeetingTime': this.datePipe.transform(this.meetingTime, 'shortTime')
    }
    this.restApiService.post(PathConstants.Zoom_Post, params).subscribe((res: any) => {
      if(res !== undefined && res !== null) {
        this.blockUI.stop();
        this.clearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.MeetingSuccess
        });
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

  clearForm() {
    this._classroomForm.reset();
    this._classroomForm.form.markAsUntouched();
    this._classroomForm.form.markAsPristine();
  }

}
