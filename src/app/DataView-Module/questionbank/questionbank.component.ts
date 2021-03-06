import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
  years?: any = [];
  logged_user: User;
  loading: boolean;
  header: string;
  questionBankData: any = [];
  questionBankCols: any;
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private masterService: MasterService,private confirmationService: ConfirmationService, 
    private _datePipe: DatePipe) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.years = this.masterService.getAccountingYear();
    this.questionBankCols = TableConstants.SQuestionBankColumns;
    this.header = 'Question Bank for ' +  this.logged_user.classRoman + ' - std'
    var data = [];
    if(this.years.length !== 0) {
      this.years.forEach(y => {
       data.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = data;
      this.selectedYear = data[0].value;
      this.onLoadQuestionBank();
    }
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
    this.questionBankData = [];
    this.loading = true;
    const params = {
      'Classcode': this.logged_user.classId,
      'QuestionYear': this.selectedYear,
      'SchoolID': this.logged_user.schoolId,
      'Medium': this.logged_user.mediumId
    }
    this.restApiService.getByParameters(PathConstants.Question_Bank_Get, params).subscribe(res => {
      if (res.length !== 0 && res !== undefined && res !== null) {
        res.forEach(r => {
          r.Publishdate = this._datePipe.transform(r.Publishdate, 'dd/MM/yyyy');
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
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    const path = "../../assets/layout/" + FileUploadConstant.QuestionBank + "/" + Filename;
    saveAs(path, Filename);
  },
  reject: (type) => { }
});
}
}