import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';

import { Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  MRowId:0
  Subject: string;
  Author:string;
  yearOptions: SelectItem[];
  selectedyear: string;
  cols: any; 
  form:any;
  data: any = [];
  uploadedFiles: any[] = [];
  Folder:any[]=[];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;

   NewFileName:string;
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.yearOptions = [
      { label: '2019-2020', value: '2019-2020' },
      { label: '2020-2021', value: '2020-2021' },
      { label: '2021-2022', value: '2021-2022' },
    ];
    this.cols = [
     // {field:'RowId',header: 'ID'},
      {field: 'Years',header: 'Year'},
      {field:'subjects',header: 'Subject'},
      {field: 'authorReference',header: 'Author/Reference'},
   //   {field: 'Pdffilename',header: 'Book Name'},
      {field: 'CreatedDate',header: 'Upload date'},
      
      
    ];
  }
 
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const params = {
    
      'RowId': this.MRowId,
      'SchoolId': 1,
      'ClassId': 1,
      'subjects': this.Subject,     
      'authorReference': this.Author,
      'Pdffilename': this.NewFileName,  
      'Years': this.selectedyear,   
      'Flag': 1,  
      
      
     
    };
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    let folderOptions=<FolderOptions>params[0];
 
    const filename = fileToUpload.name + '^' + FileUploadConstant.Booksfolder;
    this.formData.append('file', fileToUpload, filename);
    console.log('file', fileToUpload);
    console.log('formdata', this.formData);
    this.NewFileName=fileToUpload.name;
    this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => 
        {
      //          if (event.type === HttpEventType.UploadProgress)
      //    this.progress = Math.round(100 * event.loaded / event.total);
      //   else if (event.type === HttpEventType.Response) {
      //    this.message = 'Upload success.';
        
      //  //   this.onUploadFinished.emit(event.body);
      //   }
      }
      );
  }  

  onSubmit() {
    this.blockUI.start();
    const params = {
      'RowId': this.MRowId,
      'SchoolId': 1,
      'ClassId': 1,
      'subjects': this.Subject,     
      'authorReference': this.Author,
      'Pdffilename': this.NewFileName,  
      'Years': this.selectedyear,   
      'Flag': 1,  
    };
    console.log(params);
    this.restApiService.post(PathConstants.Book_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {

          this.blockUI.stop();
          this.onClear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
          this.message = 'Upload success.';

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
    
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
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
  this.Author = '',
  this.selectedyear = '',
  this.message =''
  
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.Author = selectedRow.authorReference;
    this.Subject = selectedRow.subjects;
    this.selectedyear = selectedRow.Years;
}
onDownload(Filename) {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
  const path = "../../assets/layout/"+FileUploadConstant.Booksfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
}
}

interface FolderOptions {
  FolderPath?: string;
}
