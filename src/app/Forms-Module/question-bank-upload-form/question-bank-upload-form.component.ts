import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, SelectItem } from 'primeng/api';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-question-bank-upload-form',
  templateUrl: './question-bank-upload-form.component.html',
  styleUrls: ['./question-bank-upload-form.component.css']
})
export class QuestionBankUploadFormComponent implements OnInit {
  subjectOptions: SelectItem[];
  subject: any;
  yearOptions: SelectItem[];
  year: number;
  description: string;
  classOptions: SelectItem[];
  class: string;
  mediumOptions: SelectItem[];
  medium: string;
  publishDate: Date;
  mediums?: any;
  classes?: any;
  years?: any;
  logged_user: User;
  filename: string = '';
  @ViewChild('fileSelector', { static: false }) fileSelector: ElementRef;
  @ViewChild('f', { static: false }) _questionBankForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  constructor(private masterService: MasterService, private http: HttpClient,
    private restApiService: RestAPIService, private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.logged_user = this.authService.UserInfo;
    this.classes = this.masterService.getMaster('C');
    this.mediums = this.masterService.getMaster('M');
    this.years = this.masterService.getAccountingYear();
    console.log('acc', this.mediums);
    this.subjectOptions = [
      { label: '-select-', value: null },
      { label: 'Tamil', value: 1 },
      { label: 'English', value: 2 },
      { label: 'Maths', value: 3 },
      { label: 'Science', value: 4 },
      { label: 'Social Science', value: 5 },
    ];
  }

  onSelect(type) {
    let classSelection = [];
    let yearSelection = [];
    switch (type) {
      case 'Y':
        console.log('y', this.years);
        this.years.forEach(y => {
          yearSelection.push({ label: y.ShortYear, value: y.Id });

        })
        this.yearOptions = yearSelection;
        this.yearOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        break;
        case 'M':
          this.mediumOptions = this.mediums;
        break;
    }
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    let actualFilename = '';
    const filename = fileToUpload.name + '^' + FileUploadConstant.QuestionBank;
    this.formData.append('file', fileToUpload, filename);
    actualFilename = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
      }
      );
    return actualFilename;
  }

  uploadData($event) {
    const file = $event.srcElement.files[0];
    this.filename = this.uploadFile($event.target.files);
  }

  onUpload() {
    this.blockUI.start();
    const params = {
      'RowId': 0,
      'SchoolID': this.logged_user.schoolId,
      'QuestionYear': this.year,
      'Classcode': this.class,
      'subject': this.subject.label,
      'FileName': this.filename,
      'Description': this.description,
      'Medium': this.medium,
      'Publishdate': this.publishDate,
      'Flag': 1
    }
    this.restApiService.post(PathConstants.Question_Bank_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.clearForm();
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
        this.blockUI.stop();
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

  clearForm() {
    this._questionBankForm.reset();
    this._questionBankForm.form.markAsUntouched();
    this._questionBankForm.form.markAsPristine();
    this.filename = '';
  }
}
