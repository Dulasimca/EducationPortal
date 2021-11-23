import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';
import {NgForm} from '@angular/forms';

import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {
  RowId: string;
  MRowId=0;
  SchoolID:string;
  Topic: string;
  uploadedFiles: any[] = [];
  cols: any; 
  date: Date = new Date();
  data: any = [];
  showTable: boolean;
  guardianimg: any[] = [];
  loading: boolean;
  NewFileName:string;
  login_user: User;
  shortYear: number;
  yearOptions: SelectItem[];
  years?: any;
  month: number;
  monthOptions: SelectItem[];
  months?: any;
  curMonth: number;
  public formData = new FormData();
  @BlockUI() blockUI: NgBlockUI;
  public message: string;
  @ViewChild('f', { static: false }) NewsLetterForm: NgForm;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, 
    private http: HttpClient, private masterService: MasterService,private messageService: MessageService,
    private authService: AuthService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.cols = TableConstants.NewsLetterDetailsColumns;
    this.years = this.masterService.getAccountingYear();
    this.loadMonths();
  }

  loadMonths() {
    this.curMonth = new Date().getMonth()+1;
    const curmonth = new Date().toLocaleString('default', { month: 'short' });
    for(let i = 0; i < 12; i++) {
      const formDate = new Date().getFullYear() + '-' + (i + 1) + '-01';
      const monthName = new Date(formDate).toLocaleString('default', { month: 'short' });
      this.months.push({
        Name: monthName,
        Value: i + 1
      })
    }
  }

  onSelect(type) {
    let yearSelection = [];
    let monthSelection = [];
    switch(type) {
      case 'Y':
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });

    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
    break;
    case 'M':
      this.months.forEach(m => {
        monthSelection.push({ label: m.Name, value: m.Value });
      })
      this.monthOptions = monthSelection;
      this.monthOptions.unshift({ label: '-select', value: null });
  }
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
  this.formData = new FormData()
  let fileToUpload: any = <File>files[0];
   const filename = fileToUpload.name + '^' + FileUploadConstant.Newsletterfolder;
  this.formData.append('file', fileToUpload, filename);
  console.log('file', fileToUpload);
  console.log('formdata', this.formData);
  this.NewFileName=fileToUpload.name;
  this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
    .subscribe(event => 
      { }
    );
} 
  onSubmit() {
    const params = {
      'RowId': this.MRowId,
      'SchoolID': this.login_user.schoolId,      
      'Topic': this.Topic,    
      'NewsDate': this.datepipe.transform(this.date,'MM/dd/yyyy'), 
      'Download':this.NewFileName, 
      'Flag': true
    };
    this.restApiService.post(PathConstants.NewsLetter_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.onClear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
        } else {
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

  onView() {
    this.data = [];
    var yearData = [];
    if(this.years.length !== 0 && this.months.length !== 0) {
      this.years.forEach(y => {
       yearData.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = yearData;
      this.shortYear = yearData[0].value;
      const curmonth = new Date().toLocaleString('default', { month: 'short' });
      this.monthOptions = [{ label: curmonth, value: this.curMonth}];
      this.month = this.curMonth;
     }
    this.showTable = true;
    this.loadNewsLetter();
  }

  loadNewsLetter() {
    this.loading = true;
    const params = { 
      'SchoolID': this.login_user.schoolId,
      'Month': this.month,
      'ShortYear': this.shortYear
    }
    this.restApiService.getByParameters(PathConstants.NewsLetter_Get, params).subscribe(res => {
      if(res !== null && res !== undefined) {
        if(res.length !==0) {
        this.data = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    })
  }

  onClear()
  {
    this.NewsLetterForm.reset();
    this.NewsLetterForm.form.markAsUntouched();
    this.NewsLetterForm.form.markAsPristine();
    this.Topic = '';
    this.data = [];
 
  }
  
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.Topic = selectedRow.Topic;
    this.date = selectedRow.NewsDate;
    this.NewFileName = selectedRow.Download;
  }

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
    const path = "../../assets/layout/"+FileUploadConstant.Newsletterfolder+"/"+Filename;
    //const filename = 'files' + ".pdf";
    saveAs(path, Filename);
  },
  reject: (type) => { }
});

}
  }
  
  

