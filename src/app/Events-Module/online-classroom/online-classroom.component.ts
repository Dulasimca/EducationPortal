import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { ZoomService } from 'src/app/Services/zoom.service';

@Component({
  selector: 'app-online-classroom',
  templateUrl: './online-classroom.component.html',
  styleUrls: ['./online-classroom.component.css']
})
export class OnlineClassroomComponent implements OnInit {
  date: Date = new Date();
  meetingData: any = [];
  meetingCols: any = [];
  login_user: User;
  loading: boolean;
 
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private datePipe: DatePipe,
    private zoomService: ZoomService) { }

  ngOnInit() {
    this.meetingCols = [
      { field: 'Topics', header: 'Subject' },
      { field: 'Classname1', header: 'Class' },
      { field: 'SectionName', header: 'Section' },
      { field: 'Duration', header: 'Duration' },
    ]
    this.login_user = this.authService.UserInfo;
    this.loadMeetingDetails();
  }

  loadMeetingDetails() {
    this.loading = true;
    const params = { 
      'SchoolId': this.login_user.schoolId,
      'Date': this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      'ClassId': this.login_user.classId,
      'SectionCode': this.login_user.sectioncode
     };
    this.restApiService.getByParameters(PathConstants.Zoom_Get, params).subscribe((res: any) => {
      if(res !== null && res !== undefined && res.length !== 0) {
        this.meetingData = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }

  onJoinClassroom() {
    this.zoomService.setMeeting(this.meetingData[0]);
    this.router.navigate(['/online-classroom-join']);
  }
}
