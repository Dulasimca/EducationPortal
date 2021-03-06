import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { saveAs } from 'file-saver';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-myachievement-form',
  templateUrl: './myachievement-form.component.html',
  styleUrls: ['./myachievement-form.component.css']
})
export class MyachievementFormComponent implements OnInit {

  date: Date = new Date();
  Award: any;
  event: any;
  AwardOption: SelectItem[];
  Place: any;
  Category: any;
  CategoryOption: SelectItem[];
  data: any = [];
  cols: any;
  MRowId = 0;
  login_user: User;
  attach: string;
  NewFileName: string;
  isDataAvailable: boolean;
  showtable: boolean;
  Awards?: any;
  Categorys?: any;
  maxDate: Date = new Date();
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();
  @ViewChild('f', { static: false }) _MyAchievementForm: NgForm;
  @ViewChild('file', { static: false }) _attachment: ElementRef;

  constructor(private restApiService: RestAPIService, private http: HttpClient, private datepipe: DatePipe, private messageService: MessageService
    , private authService: AuthService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.restApiService.get(PathConstants.Award_Get).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.Awards = res.Table;
        this.Categorys = res.Table1
      }
    });
    this.cols = TableConstants.MyAchievementsCoulmns;
    this.login_user = this.authService.UserInfo;
  }

  onSelect(type) {
    let awardSelection = []
    let categorySelection = []
    switch (type) {
      case 'A':
        this.Awards.forEach(c => {
          awardSelection.push({ label: c.Name, value: c.Id })
        });
        this.AwardOption = awardSelection;
        this.AwardOption.unshift({ label: '-select', value: null });
        break;
      case 'C':
        this.Categorys.forEach(c => {
          categorySelection.push({ label: c.Name, value: c.Id })
        });
        this.CategoryOption = categorySelection;
        this.CategoryOption.unshift({ label: '-select', value: null });
        break;
    }
  }

  onSubmit() {
    const params = {
      'RowId': this.MRowId,
      'SchoolId': this.login_user.schoolId,
      'StudentId': this.login_user.id,
      'eventdate': this.datepipe.transform(this.date, 'MM/dd/yyyy'),
      'EventDetailS': this.event,
      'Category': this.Category,
      'Place': this.Place,
      'AchievementStatus': this.Award,
      'filename': this.NewFileName,
      'Flag': 1,
    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
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
    this.NewFileName = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => {
      }
      );
  }

  onView() {
    this.data = [];
    const params = {
      'SchoolID': this.login_user.schoolId,
      'StudentId': this.login_user.id
    }
    this.restApiService.getByParameters(PathConstants.Myachievement_Get, params).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.length !== 0) {
          this.showtable = true;
          res.Table.forEach(x => {
            x.eDate = this.datepipe.transform(x.eventdate, 'dd/MM/yyyy');
          })
          this.data = res.Table;
        } else {
          this.showtable = false;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      } else {
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
    this.CategoryOption = [];
    this.Place = [];
    this.event = [];
    this.AwardOption = [];
    this.date = new Date();
    this.data = [];
    if (this._attachment.nativeElement.files.length !== 0) {
      this._attachment.nativeElement.value = null;
    }
  }

  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.date = new Date(selectedRow.eventdate);
    this.Category = selectedRow.Category;
    this.CategoryOption = [{ label: selectedRow.CategoryName, value: selectedRow.Category }];
    this.Place = selectedRow.Place;
    this.Award = selectedRow.AchievementStatus;
    this.AwardOption = [{ label: selectedRow.AchievementName, value: selectedRow.AchievementStatus }];
    this.event = selectedRow.EventDetailS;
  }

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/" + FileUploadConstant.Achievementfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}
