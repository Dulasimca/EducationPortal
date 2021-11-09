import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css']
})
export class QuestionbankComponent implements OnInit {
  selectedYear: number;
  yearOptions: SelectItem[];
  data: any;
  link: any;
  years?: any;
  logged_user: User;
  loading: boolean;
  questionBankData: any = [];
  questionBankCols: any;
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private masterService: MasterService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.years = this.masterService.getAccountingYear();
    this.questionBankCols = TableConstants.SQuestionBankColumns;
  }

  onSelect() {
    let yearSelection = [];
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });
    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
  }

  onLoadQuestionBank() {
    this.loading = true;
    const params = {
      'Classcode': this.logged_user.classId,
      'QuestionYear': this.selectedYear,
      'SchoolID': this.logged_user.schoolId
    }
    this.restApiService.getByParameters(PathConstants.Question_Bank_Get, params).subscribe(res => {
      console.log(res,'rs');
      if (res.length !== 0 && res !== undefined && res !== null) {
        res.forEach(r => {
          r.Publishdate = this._datePipe.transform(r.Publishdate, 'MM/dd/yyyy');
        })
        this.questionBankData = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
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

  onDownload(Filename) {
    const path = "../../assets/layout/" + FileUploadConstant.QuestionBank + "/" + Filename;
    saveAs(path, Filename);
  }

}