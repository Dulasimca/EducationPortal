import { Component, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-myachievement-form',
  templateUrl: './myachievement-form.component.html',
  styleUrls: ['./myachievement-form.component.css']
})
export class MyachievementFormComponent implements OnInit {

  date: Date = new Date();
  Award: any;
  AwardOption :SelectItem[];
  Place : any;
  Category : any;
  CategoryOption:SelectItem[];
  data: any = []; 
  cols: any;
  MRowId=0;
  login_user: User;
  attach: string;
  NewFileName:string;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  @ViewChild('f', { static: false }) _MyAchievementForm: NgForm;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService
    , private authService: AuthService) { }

  ngOnInit(): void {
    this.cols = [
      // { field: 'RowId', header: 'ID' },
      { field: 'eventdate', header: 'Date' },
      { field: 'EventDetailS', header: 'Events' },
      { field: 'Place', header: 'Place' },
      { field: 'AchievementStatus', header: 'Status' } 
 
  ];
  this.CategoryOption = [
    { label: '-select-', value: null },
    { label: 'International', value: 'international'},
    { label: 'National', value: 'national'},
    { label: 'Domestic', value: 'domestic'},
  ];
  this.login_user = this.authService.UserInfo;
  }
  onSubmit() {
    const params = {    
      'RowId': this.MRowId,
      'SchoolId': this.login_user.schoolId,         
      'StudentId':1,
      'eventdate': this.datepipe.transform(this.date, 'MM/dd/yyyy') ,    
      'EventDetailS':this.Category,
      'Place': this.Place,  
      'AchievementStatus':this.Award,
      'filename':this.NewFileName,
      'Flag': 1, 

    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.clear();
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
      public uploadFile = (files) => {
        if (files.length === 0) {
          return;
        }
        this.formData = new FormData()
        let fileToUpload: any = <File>files[0];
     
        const filename = fileToUpload.name + '^' + FileUploadConstant.Achievementfolder;
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
  onView() {
    const params = {
      'SchoolID': this.login_user.schoolId,
    }
    this.restApiService.getByParameters(PathConstants.Myachievement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
  
  }
  clear() {
    this._MyAchievementForm.reset();
    this._MyAchievementForm.form.markAsUntouched();
    this._MyAchievementForm.form.markAsPristine();
    this.Category="",
    this.Place="",
    this.Award=""
    
  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.date=selectedRow.eventdate;
    this.Category=selectedRow.EventDetailS;
    this.Place=selectedRow.Place;
    this.Award=selectedRow.AchievementStatus;
  }
  onDownload(Filename) {
    const path = "../../assets/layout/"+FileUploadConstant.Achievementfolder+"/"+Filename;
    saveAs(path, Filename);
  }
}
