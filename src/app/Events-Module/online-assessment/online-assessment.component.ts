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

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private datePipe: DatePipe, private messageService: MessageService, private router: Router,
    private testService: AssessmentService) { }

  ngOnInit() {
    this.assessmentCols = [
      { field: 'test', header: 'Test Name' },
      { field: 'questiontype', header: 'Question Type' },
      { field: 'totalmarks', header: 'Total Marks' },
      { field: 'subject', header: 'Subject' },
      { field: 'duration', header: 'Duration' },
    ]
    this.login_user = this.authService.UserInfo;
  }

  onLoadAssessment() {
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
          if (index >= 1 && i.RowId !== res[index - 1].RowId) {
            this.assessmentData.push({
              test: i.TestName, subject: 'English',
              duration: i.Duration + (i.durationtype === 1) ? 'Mins' : 'Hrs',
              totalmarks: i.totalmarks, questiontype: 'Multiple Choice'
            })
          } else if (index === 0) {
            this.assessmentData.push({
              test: i.TestName, subject: 'English',
              duration: i.totalduration + (i.durationtype === 1) ? 'Mins' : 'Hrs',
              totalmarks: i.totalmarks, questiontype: 'Multiple Choice'
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

  onStart() {
    this.testService.setResponse(this.questionData);
    this.router.navigate(['/online-test']);
  }
}
