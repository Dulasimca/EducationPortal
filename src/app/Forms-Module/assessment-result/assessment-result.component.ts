import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.css']
})
export class AssessmentResultComponent implements OnInit {
  testNameOptions: SelectItem[];
  testId: number;
  testDate: Date = new Date();
  assessmentDetails: any[] = [];
  assessmentCols: any;
  login_user: User;
  tests?: any;
  loading: boolean;
  showDialog: boolean;
  totalMarks: any;
  testDescription: string;
  subject: string;
  constructor(private _authService: AuthService, private _masterService: MasterService,
    private _datepipe: DatePipe, private _restApiService: RestAPIService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.login_user = this._authService.UserInfo;
    this._masterService.getMaster('');
    this.assessmentCols = TableConstants.OnlineAssessmentDetailColumns;
  }

  onSelect() {
    this.tests = this._masterService.getMaster('TS');
    let testSelection = [];
    this.tests.forEach(c => {
      testSelection.push({ label: c.name, value: c.code })
    });
    this.testNameOptions = testSelection;
    this.testNameOptions.unshift({ label: '-select', value: null });
  }

  loadAssessmentDetails() {
    this.assessmentDetails = [];
    this.loading = true;
    const params = {
      'SchoolId': this.login_user.schoolId,
      'StudentId': this.login_user.id,
      'ClassId': this.login_user.classId,
      'SectionId': this.login_user.section,
      'TestId': this.testId,
      'TestDate': this._datepipe.transform(this.testDate, 'MM/dd/yyyy')
    }
    this._restApiService.post(PathConstants.OnlineAssessment_Asnwer_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res.length !== 0) {
          this.assessmentDetails = res;
          this.loading = false;
        } else {
          this.loading = false;
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      } else {
        this.loading = false;
        this._messageService.clear();
        this._messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }

  viewResult(selectedRow) {
    this.subject = selectedRow.subject;
    this.totalMarks = selectedRow.totalmarks;
    this.testDescription = selectedRow.description;
    const params = {
      'SubjectId': selectedRow.subjectId
    }
    this._restApiService.getByParameters(PathConstants.OnlineAssessmentCheck_Get, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          this.showDialog = true;
        } else {
          this.showDialog = false;
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      } else {
        this.showDialog = false;
        this._messageService.clear();
        this._messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }

}
