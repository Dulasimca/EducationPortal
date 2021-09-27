import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import {NgForm} from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';

import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';

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

  guardianimg: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;

   NewFileName:string;
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.cols = [
      //{field:'RowId',header: 'ID'},
      {field: 'CircularDate',header: 'Circular Date'},
      {field:'Subject',header: 'Subject'},
      {field: 'Details',header: 'Details'},
      //{field: 'Download',header: 'Circular Upload'},
     // {field: 'CreatedDate',header: 'Upload date'},
      
    ];

  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const params = {
     
      
      'RowId': this.MRowId,
      'SchoolID':  1,
      'CircularDate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
      'Subject': this.Subject,
      'Details': this.Details,
      'Download':this.NewFileName,
      'Flag':  true
    };
  
  this.formData = new FormData()
  let fileToUpload: any = <File>files[0];
  let folderOptions=<FolderOptions>params[0];

  const filename = fileToUpload.name + '^' + FileUploadConstant.Circularfolder;
  this.formData.append('file', fileToUpload, filename);
  console.log('file', fileToUpload);
  console.log('formdata', this.formData);
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
      'SchoolID':  1,
      'CircularDate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
      'Subject': this.Subject,
      'Details': this.Details,
      'Download':this.NewFileName,
      'Flag':  true
     
    };
    console.log(params);
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
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.Circular_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })
   
  }


  onClear()
  {
  //this.date = '',
  this.Subject = '',
  this.Details = ''
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.date = selectedRow.CircularDate;
    this.Subject = selectedRow.Subject;
    this.Details = selectedRow.Details;
}
onDownload(Filename) {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
  const path = "../../assets/layout/"+FileUploadConstant.Circularfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
}
}
interface FolderOptions {
  FolderPath?: string;
}


