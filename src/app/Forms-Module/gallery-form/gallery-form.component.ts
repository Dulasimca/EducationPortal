import { Component, OnInit,ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit {
  title:string;
  MRowId:0;
  uploadedFiles: any[] = [];
  date: any;
  data: any = [];
  cols: any;
  showtable: boolean;
  
  guardianimg: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;

   NewFileName:string;
  public formData = new FormData();
  @ViewChild('f', { static: false }) _GalleryForm: NgForm;
  login_user: User;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService,
    private authService: AuthService,private confirmationService: ConfirmationService, private router: Router ) { }
    

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.cols = [
      //{field:'RowId',header: 'ID'},
      {field: 'Date',header: 'Date'},
      //{field:'Subject',header: 'Subject'},
      {field: 'title',header: 'Title'},
    
    ];

  }
  
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

  
  this.formData = new FormData()
  let fileToUpload: any = <File>files[0];
  const filename = fileToUpload.name + '^' + FileUploadConstant.Galleryfolder;
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
    'school':  this.login_user.schoolId,
    'Date': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
    'imagefilename': this.NewFileName,
    'title':this.title,
    'Flag':  1
   
  };
  this.restApiService.post(PathConstants.Gallery_Post, params).subscribe(res => {
    if(res !== undefined && res !== null) {
      if (res) {
  console.log(res,'ii');
        // this.blockUI.stop();
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
  // this.showtable = true;
  // const params = { 
  //   'SchoolID': this.login_user.schoolId,
  // }
  
  // this.restApiService.getByParameters(PathConstants.Gallery_Get, params).subscribe(res => {
  //   if(res !== null && res !== undefined && res.length !==0) {
  //     console.log(res);
  //     this.data = res;
  //   }
    
  // })
  this.router.navigate(['/gallery-list'])
 
}


onClear()
{
  this._GalleryForm.reset();
  this._GalleryForm.form.markAsUntouched();
  this._GalleryForm.form.markAsPristine();
  this.title = ''

}


onRowSelect(event, selectedRow) {
  this.MRowId = selectedRow.RowId;
  this.date = selectedRow.Date;
  this.title = selectedRow.title;
  this.NewFileName=selectedRow.previewImageSrc;
}
 

onDownload(Filename) {
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
//const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
const path = "../../assets/layout/"+FileUploadConstant.Galleryfolder+"/"+Filename;
//const filename = 'files' + ".pdf";
saveAs(path, Filename);
},
reject: (type) => { }
});

}
}




