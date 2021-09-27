import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
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
  guardianimg: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;

  NewFileName:string;
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, 
    private http: HttpClient, private masterService: MasterService,private messageService: MessageService) { }


  ngOnInit(): void {

    this.cols = [
     // {field:'RowId',header: 'ID'},
      {field:'NewsDate',header: 'Date'},
      {field:'Topic',header: 'Topic'},
      //{field:'Download',header: 'Newsletter Upload'},
      {field: 'CreatedDate',header: 'Upload date'},
      
    ];
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const params = {
     
      
      'RowId': this.MRowId,
      'SchoolID': 1,      
      'Topic': this.Topic,    
      'NewsDate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
      'Download':this.NewFileName,
      'Flag': 1,
    };
  
  this.formData = new FormData()
  let fileToUpload: any = <File>files[0];
  let folderOptions=<FolderOptions>params[0];

  const filename = fileToUpload.name + '^' + FileUploadConstant.Newsletterfolder;
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
      'SchoolID': 1,      
      'Topic': this.Topic,    
      'NewsDate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
      'Download':this.NewFileName, 
      'Flag': 1,
    };
    console.log(params);
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

  onview() {
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.NewsLetter_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })

  }

  onClear()
  {
  
  this.Topic = ''
 
  }
  
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.Topic = selectedRow.Topic;
    this.date = selectedRow.NewsDate;
    
    
  }
  onDownload(Filename) {
    //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
    const path = "../../assets/layout/"+FileUploadConstant.Newsletterfolder+"/"+Filename;
    //const filename = 'files' + ".pdf";
    saveAs(path, Filename);
  }
  }
  interface FolderOptions {
    FolderPath?: string;
  }
  

