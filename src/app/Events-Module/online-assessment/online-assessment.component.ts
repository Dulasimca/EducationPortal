import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { AssessmentService } from 'src/app/Services/online-test.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-online-assessment',
  templateUrl: './online-assessment.component.html',
  styleUrls: ['./online-assessment.component.css']
})
export class OnlineAssessmentComponent implements OnInit {
  date: Date = new Date();
  assessmentCols: any;
  assessmentData: any = [];
  login_user: User;
  loading: boolean;
  questionData: any = [];
  canStart: boolean;

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private datePipe: DatePipe, private messageService: MessageService, private router: Router,
    private testService: AssessmentService) { }

  ngOnInit() {
    this.assessmentCols = [
      { field: 'test', header: 'Test Name' },
      { field: 'description', header: 'Description' },
      { field: 'totalmarks', header: 'Total Marks' },
      { field: 'subject', header: 'Subject' },
      { field: 'duration', header: 'Duration' },
      { field: 'time', header: 'Start Time' }
    ]
    this.login_user = this.authService.UserInfo;
    this.onLoadAssessment();
  }

  onLoadAssessment() {
    this.assessmentData = [];
    this.questionData = [];
    if (this.date !== null && this.date !== undefined) {
      this.loading = true;
      const params = {
        'SchoolID': this.login_user.schoolId,
        'ClassID': this.login_user.classId,
        'TestDate': this.datePipe.transform(this.date, 'yyyy-MM-dd')
      }
      this.restApiService.getByParameters(PathConstants.OnlineAssessment_Get, params).subscribe(res => {
        if (res !== undefined && res !== null && res.length !== 0) {
          this.loading = false;
          this.questionData = res.slice(0);
          res.forEach((i, index) => {
            let canStart: boolean;
            canStart = this.checkAssessmentTime(i);
            i.AssessmentTime = this.datePipe.transform(i.AssessmentTime, 'hh:mm a');
            if (index >= 1 && i.RowId !== res[index - 1].RowId) {
              this.assessmentData.push({
                test: i.TestName, subject: i.Subject,
                duration: i.totalduration + ((i.durationtype === 1) ? 'Mins' : 'Hrs'),
                totalmarks: i.totalmarks, questiontype: 'Multiple Choice',
                description: i.TestDescription, time: i.AssessmentTime,
                enable: canStart
              })
            } else if (index === 0) {
              this.assessmentData.push({
                test: i.TestName, subject: i.Subject,
                duration: i.totalduration + ((i.durationtype === 1) ? 'Mins' : 'Hrs'),
                totalmarks: i.totalmarks, questiontype: 'Multiple Choice',
                description: i.TestDescription, time: i.AssessmentTime,
                enable: canStart
              })
            }
          })
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
  }

  checkAssessmentTime(row) {
    const assessmentDate = new Date(row.AssessmentDate);
    const assessmentTime = new Date(row.AssessmentTime);
    const today = new Date();
    if (assessmentDate > today) {
      return false;
    } else if (assessmentDate === today) {
      if (assessmentTime.getTime() > today.getTime()) {
        return false;
      } else if (assessmentTime.getTime() === today.getTime()) {
        return true;
      }
    }
  }

  onStart() {
    this.testService.setResponse(this.questionData);
    this.router.navigate(['/online-test']);
  }
}
