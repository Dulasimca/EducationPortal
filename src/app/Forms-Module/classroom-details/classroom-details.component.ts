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
  classroomDetailsCols: any;
  classroomDetails: any[] = [];
  showTable: boolean;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _classroomForm: NgForm;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.masterService.getMaster('');
    this.classroomDetailsCols = [
      { field: 'SubjectName', header: 'Subject' },
      { field: 'Classname1', header: 'Class' },
      { field: 'SectionName', header: 'Section' },
      { field: 'MeetingTime', header: 'Time' },
      { field: 'Duration', header: 'Duration' },
    ];
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
          if ((c.class * 1) === this.class) {
            subjectSelection.push({ label: c.name, value: c.code })
          }
        });
        this.subjectOptions = subjectSelection;
        this.subjectOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onView() {
    this.showTable = true;
    const params = { 
      'SchoolId': this.login_user.schoolId,
      'Date': this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      'ClassId': this.login_user.classId,
      'SectionCode': this.login_user.sectioncode
     };
    this.restApiService.getByParameters(PathConstants.Zoom_Get, params).subscribe((res: any) => {
      if(res !== null && res !== undefined && res.length !== 0) {
        this.classroomDetails = res;
      } else {
        this.showTable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    });
  }

  onEdit(selectedRow) {
    if(selectedRow !== undefined && selectedRow !== null) {
      this.class = selectedRow.ClassId;
      this.classOptions = [{ label: selectedRow.Classname1, value: selectedRow.ClassId }];
      this.section = selectedRow.SectionCode;
      this.sectionOptions = [{ label: selectedRow.SectionName, value: selectedRow.SectionCode }];
      this.subject = selectedRow.SubjectId;
      this.subjectOptions = [{ label: selectedRow.SubjectName, value: selectedRow.SubjectId }];
      this.meetingDate = new Date(selectedRow.MeetingDate);
      this.meetingTime = selectedRow.MeetingTime;
      this.duration = selectedRow.Duration;
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
