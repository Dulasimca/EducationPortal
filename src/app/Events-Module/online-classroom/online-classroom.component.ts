import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { Meeting } from 'src/app/Interfaces/meeting';
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
  toolTip: string;
  minDate: Date;
  invalidDates: Array<Date>;
  zoomSettings: any = [];

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private datePipe: DatePipe,
    private zoomService: ZoomService) { }

  ngOnInit() {
    this.meetingCols = [
      { field: 'SubjectName', header: 'Subject' },
      { field: 'Classname1', header: 'Class' },
      { field: 'SectionName', header: 'Section' },
      { field: 'MeetingTime', header: 'Time' },
      { field: 'Duration', header: 'Duration' },
    ];
    this.login_user = this.authService.UserInfo;
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    this.minDate = new Date();
    // this.minDate.setMonth(prevMonth);
    // this.minDate.setFullYear(prevYear);
    // let invalidDate = new Date();
    // invalidDate.setDate(today.getDate() - 1);
    // var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    // console.log('tdy', today.getDate(), today.getDate()-1, invalidDate,firstDay);
    // this.invalidDates = [invalidDate, firstDay];
    this.fetchZoomSettings();
    this.loadMeetingDetails();
  }

  fetchZoomSettings() {
    this.restApiService.getByParameters(PathConstants.ZoomSettings_Get, { 'SchoolId': this.login_user.schoolId }).subscribe(settings => {
      this.zoomSettings = settings;
    })
  }

  loadMeetingDetails() {
    this.meetingData = [];
    this.toolTip = (this.login_user.roleId === 5) ? 'Start Class' : 'Join Class';
    this.loading = true;
    const params = { 
      'SchoolId': this.login_user.schoolId,
      'Date': this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      'ClassId': this.login_user.classId,
      'SectionCode': this.login_user.sectioncode
     };
    this.restApiService.getByParameters(PathConstants.Zoom_Get, params).subscribe((res: any) => {
      if(res !== null && res !== undefined && res.length !== 0) {
        res.forEach(i => {
          const now = new Date().getTime();
          const record = new Date(i.MeetingTime).getTime();
          if(now > record) {
            i.isOver = true;
          } else {
            i.isOver = false;
          }
        })
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

  onJoinClassroom(meetingInfo) {
    console.log('info', meetingInfo);
    var zoomParams: Meeting = {
   //   meetingNumber: meetingInfo.MeetingId,
   meetingNumber: '81109773373',
      meetingURL: meetingInfo.MeetingURL,
    //  passWord: meetingInfo.Passcode,
    passWord: 'T7FDXW',
      apiKey: this.zoomSettings[0].APIkey,
      apiSecret: this.zoomSettings[0].APISecret,
      registrantToken: this.zoomSettings[0].JWTToken,
      userEmail: meetingInfo.HostEmail,
      userName: this.login_user.username,
      signatureEndpoint: this.zoomSettings[0].URL,
      leaveUrl: this.zoomSettings[0].LeaveURL,
      role: ((this.login_user.roleId * 1) === 5) ? '1' : '0'
    }
    this.zoomService.setMeeting(zoomParams);
    this.router.navigate(['/online-classroom-join']);
  }
}
