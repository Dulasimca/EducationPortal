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
  subject: any;
  meetingDate: Date;
  meetingTime: Date;
  sectionOptions: SelectItem[];
  section: any;
  classOptions: SelectItem[];
  class: any;
  login_user: User;
  sections?: any;
  classes?: any;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _classroomForm: NgForm;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    this.subjectOptions = [
      { label: '-select-', value: null },
      { label: 'Tamil', value: 1 },
      { label: 'English', value: 2 },
      { label: 'Maths', value: 3 },
      { label: 'Science', value: 4 },
      { label: 'Social Science', value: 5 },
    ];
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

  onSave() {
    this.blockUI.start();
    this.messageService.clear();
    const params = {
      'ClassId': this.class,
      'SectionCode': this.section,
      'MeetingDate': this.datePipe.transform(this.meetingDate, 'yyyy-MM-dd'),
      'SchoolId': this.login_user.schoolId,
      'Duration': this.duration,
      'Topics': this.subject.label,
      'MeetingTime': this.meetingTime
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
