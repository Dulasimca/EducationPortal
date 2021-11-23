import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth.service';
import { NgForm } from '@angular/forms';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { saveAs } from 'file-saver';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';


@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  date: Date = new Date();
  tag:string;
  Announcement: string;
  Topic:string;
  announce:string;
  data: any = []; 
  MRowid=0;
  cols: any;
  uploadedFiles: any[] = [];
  @ViewChild('f', { static: false }) _AnnouncementForm: NgForm;
  public progress: number;
  public message: string;
  NewFileName:string = '';
  login_user: User;
  showtable: boolean;
  loading: boolean;
  public formData = new FormData();
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('file', { static: false }) _attachment: ElementRef;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService
    ,private authService: AuthService,private masterService: MasterService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cols = TableConstants.AnnouncementsColumns;
      this.login_user = this.authService.UserInfo;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
 
    const filename = fileToUpload.name + '^' + FileUploadConstant.Announcementfolder;
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
    this.blockUI.start();
   
    const params = {
      'RowID': this.MRowid,
      'SchoolID': this.login_user.schoolId,      
      'Announcementdate': this.datepipe.transform(this.date,'MM/dd/yyyy'),     
      'AnnouncementTag':this.Topic, 
      'Announcement': this.Announcement,
      'Announcementfilename': this.NewFileName,
      'Flag' : true

    };
    console.log(params);
    this.restApiService.post(PathConstants.Announcement_Post, params).subscribe(res => {
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
     onView() {
       this.data = [];
       this.loading = true;
       this.showtable = true;
    const params = {
      'SchoolID': this.login_user.schoolId,
    }
      this.restApiService.getByParameters(PathConstants.Announcement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
        if (res.length !== 0) {
          res.forEach(r => {
          r.adate = this.datepipe.transform(r.Announcementdate, 'dd/MM/yyyy');
          })
        this.loading = false;
      this.data = res;
      } else {
        this.loading = false;
        this.showtable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    }
    });

  }
  clear() {
    this._AnnouncementForm.reset();
    this._AnnouncementForm.form.markAsUntouched();
    this._AnnouncementForm.form.markAsPristine();
    this.Topic="",
    this.Announcement="",
    this.NewFileName = '',
    this.date = new Date();
    this.data = [];
    if (this._attachment.nativeElement.files.length !== 0) {
      this._attachment.nativeElement.value = null;
    }
  }
  onEdit(selectedRow) {
    this.MRowid=selectedRow.RowId;
    this.date = new Date(selectedRow.Announcementdate);
    this.Topic = selectedRow.AnnouncementTag;
    this.announce = selectedRow.Announcementfilename;
    this.Announcement = selectedRow.Announcement;
    console.log(selectedRow.RowId);
  }
  
  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    const path = "../../assets/layout/"+FileUploadConstant.Announcementfolder+"/"+Filename;
    saveAs(path, Filename);
  },
reject: (type) => { }
});

}
 
}
