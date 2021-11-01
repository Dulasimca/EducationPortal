import { Component, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
  event: any;
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
  isDataAvailable: boolean;
  showtable: boolean;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  @ViewChild('f', { static: false }) _MyAchievementForm: NgForm;
  loading: boolean;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService
    , private authService: AuthService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.restApiService.get(PathConstants.Award_Get).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        // this.feeTypes = res;
      }
    });
    this.cols = [
      // { field: 'RowId', header: 'ID' },
      { field: 'eventdate', header: 'Date' },
      { field: 'EventDetailS', header: 'Category' },
      { field: 'Category', header: 'Events' },
      { field: 'Place', header: 'Place' },
      { field: 'AchievementStatus', header: 'Status' } 
 
  ];
  this.CategoryOption = [
    { label: '-select-', value: null },
    { label: 'International', value: 'international'},
    { label: 'National', value: 'national'},
    { label: 'Domestic', value: 'domestic'},
  ];
  // this.AwardOption = [
  //    { label: '-select-', value: null},
  //    { label: 'First', value: 'first'},
  //    { label: 'Second', value: 'second'},
  //    { label: 'Third', value: 'third'},
  //    { label: 'Winner', value: 'winner'},
  //    { label: 'Runner', value: 'runner'},
  //    { label: 'Gold', value: 'gold'},
  //    { label: 'Silver', value: 'silver'},
  //    { label: 'Bronze', value: 'bronze'},
  //    { label: 'First Rank', value: 'first rank'},
  //    { label: 'Second Rank', value: 'second rank'},
  //    { label: 'Third Rank', value: 'third rank'},
  // ];

  this.login_user = this.authService.UserInfo;
  }
  onSubmit() {
    const params = {    
      'RowId': this.MRowId,
      'SchoolId': this.login_user.schoolId,         
      'StudentId':1,
      'eventdate': this.datepipe.transform(this.date, 'MM/dd/yyyy') ,    
      'EventDetailS':this.Category,
      'Category': this.event,
      'Place': this.Place,  
      'AchievementStatus':this.Award,
      'filename':this.NewFileName,
      'Flag': 1, 

    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.onView();
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
        this.NewFileName=fileToUpload.name;
        this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
          .subscribe(event => 
            {
          }
          );
      }  
  onView() {
    this.data = [];
    this.showtable = true;
    this.loading = true;
    const params = {
      'SchoolID': this.login_user.schoolId,
    }
    this.restApiService.getByParameters(PathConstants.Myachievement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      this.data = res;
      this.loading = false;
      } else {
        this.loading = false;
         this.showtable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    });
  
  }
  clear() {
    this._MyAchievementForm.reset();
    this._MyAchievementForm.form.markAsUntouched();
    this._MyAchievementForm.form.markAsPristine();
    this.Category="",
    this.Place="",
    this.Award="",
    this.date = new Date();
    
  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.date=selectedRow.eventdate;
    this.Category=selectedRow.EventDetailS;
    this.CategoryOption= [{ label: selectedRow.EventDetailS, value: selectedRow.Category }];
    this.Place=selectedRow.Place;
    this.Award=selectedRow.AchievementStatus;
    this.AwardOption = [{ label: selectedRow.AchievementStatus, value: selectedRow.Award}];
    this.event = selectedRow.Category;
  }

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/"+FileUploadConstant.Achievementfolder+"/"+Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
   
  }
  // onSelect(type) {
  //   let AwardSelection = [];
  //   switch(type){
  //     case 'A':
  //       this.AwardOption = [
  //          { label: '-select-', value: null},
  //          { label: 'First', value: 'first'},
  //          { label: 'Second', value: 'second'},
  //          { label: 'Third', value: 'third'},
  //          { label: 'Winner', value: 'winner'},
  //          { label: 'Runner', value: 'runner'},
  //          { label: 'Gold', value: 'gold'},
  //          { label: 'Silver', value: 'silver'},
  //          { label: 'Bronze', value: 'bronze'},
  //          { label: 'First Rank', value: 'first rank'},
  //          { label: 'Second Rank', value: 'second rank'},
  //          { label: 'Third Rank', value: 'third rank'},      
  //       ];
  //       break;
  //       case 'C':
  //         this.CategoryOption = [
  //           { label: '-select-', value: null },
  //           { label: 'International', value: 'international'},
  //           { label: 'National', value: 'national'},
  //           { label: 'Domestic', value: 'domestic'},
  //         ];
  //         break;
  //   }
   
  // }
}
