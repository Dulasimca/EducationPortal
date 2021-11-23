import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import {NgForm} from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';

import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
@Component({
  selector: 'app-circular-form',
  templateUrl: './circular-form.component.html',
  styleUrls: ['./circular-form.component.css']
})
export class CircularFormComponent implements OnInit {

  Subject: string;
  Details:string;
  RowId: string;
  MRowId:0;
  school_id:string;
  cols: any;

  date: Date = new Date();
  data: any = [];
  loading: boolean;


  guardianimg: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;

   NewFileName:string;
  public formData = new FormData();
  @ViewChild('f', { static: false }) CircularForm: NgForm;
  @ViewChild('file', { static: false }) _attachment: ElementRef;
  login_user: User;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService,
    private authService: AuthService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.cols = TableConstants.CircularDetailsColumns;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
  this.formData = new FormData()
  let fileToUpload: any = <File>files[0];
  const filename = fileToUpload.name + '^' + FileUploadConstant.Circularfolder;
  this.formData.append('file', fileToUpload, filename);
  this.NewFileName=fileToUpload.name;
  this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
    .subscribe(event => 
      {
    
    }
    );
}  
  onSubmit() {
    const params = {   
      'RowId': this.MRowId,
      'SchoolID': this.login_user.schoolId,
      'CircularDate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
      'Subject': this.Subject,
      'Details': this.Details,
      'Download':this.NewFileName,
      'Flag':  true
     };
    this.restApiService.post(PathConstants.Circular_Post, params).subscribe(res => {
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

  onview() {
    this.data = [];
    this.loading = true;
    const params = { 
      'SchoolID': this.login_user.schoolId,
    }
    
    this.restApiService.getByParameters(PathConstants.Circular_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        this.loading = false;
        this.data = res;
      }else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
      
    })
   
  }


  onClear()
  {
    this.CircularForm.reset();
    this.CircularForm.form.markAsUntouched();
    this.CircularForm.form.markAsPristine();
    this.Subject = '';
    this.Details = '';
    this.date = new Date();
    this.data = [];
    if (this._attachment.nativeElement.files.length !== 0) {
      this._attachment.nativeElement.value = null;
    }
  }
  onEdit(selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.date = new Date(selectedRow.CircularDate);
    this.Subject = selectedRow.Subject;
    this.Details = selectedRow.Details;
    this.NewFileName = selectedRow.Download;
}
onDownload(Filename) {
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
  const path = "../../assets/layout/"+FileUploadConstant.Circularfolder+"/"+Filename;
  saveAs(path, Filename);
},
reject: (type) => { }
});

}
}


