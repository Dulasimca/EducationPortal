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
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-question-bank-upload-form',
  templateUrl: './question-bank-upload-form.component.html',
  styleUrls: ['./question-bank-upload-form.component.css']
})
export class QuestionBankUploadFormComponent implements OnInit {
  subjectOptions: SelectItem[];
  subject: number;
  yearOptions: SelectItem[];
  year: number;
  description: string;
  classOptions: SelectItem[];
  class: number;
  mediumOptions: SelectItem[];
  medium: string;
  publishDate: Date;
  mediums?: any;
  classes?: any;
  years?: any;
  subjects?: any;
  logged_user: User;
  filename: string = '';
  questionBankCols: any;
  questionBankData: any = [];
  loading: boolean;
  selectedYear: number;
  viewYearOptions: SelectItem[];
  showTable: boolean;
  disableSubject: boolean;
  @ViewChild('fileSelector', { static: false }) fileSelector: ElementRef;
  @ViewChild('f', { static: false }) _questionBankForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  constructor(private masterService: MasterService, private http: HttpClient,
    private restApiService: RestAPIService, private messageService: MessageService,
    private authService: AuthService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.logged_user = this.authService.UserInfo;
    this.masterService.getMaster('');
    this.masterService.getAccountingYear();
    this.questionBankCols = TableConstants.TQuestionBankColumns;
    this.disableSubject = true;
  }

  onSelect(type) {
    this.years = this.masterService.getAccountingYear();
    this.classes = this.masterService.getMaster('C');
    this.mediums = this.masterService.getMaster('M');
    this.subjects = this.masterService.getMaster('SB');
    let classSelection = [];
    let yearSelection = [];
    let mediumSelection = [];
    let subjectSelection = [];
    switch (type) {
      case 'Y':
        this.years.forEach(y => {
          yearSelection.push({ label: y.ShortYear, value: y.Id });

        })
        this.yearOptions = yearSelection.slice(0);
        this.yearOptions.unshift({ label: '-select-', value: null });
        this.viewYearOptions = yearSelection.slice(0);
        this.viewYearOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        if(this.class !== undefined && this.class !== null) {
          this.disableSubject = false;
        } else {
          this.disableSubject = true;
        }
        break;
      case 'M':
        this.mediums.forEach(c => {
          mediumSelection.push({ label: c.name, value: c.code })
        });
        this.mediumOptions = mediumSelection;
        this.mediumOptions.unshift({ label: '-select', value: null });
        break;
      case 'S':
        this.subjects.forEach(c => {
          if ((c.class * 1) === this.class) {
            subjectSelection.push({ label: c.name, value: c.code })
          }
        });
        this.subjectOptions = subjectSelection;
        this.subjectOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onChangeClass() {
    this.subjectOptions = [];
    this.subject = null;
    if(this.class !== undefined && this.class !== null) {
      this.disableSubject = false;
    } else {
      this.disableSubject = true;
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
      'subject': this.subject,
      'FileName': this.filename,
      'Description': this.description,
      'Medium': this.medium,
      'Publishdate': this.datepipe.transform(this.publishDate,'MM/dd/yyyy'),
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

  onLoadQuestionBank() {
    this.questionBankData = [];
    if (this.selectedYear !== undefined && this.selectedYear !== null) {
      this.loading = true;
      const params = {
        'Classcode': this.class,
        'QuestionYear': this.selectedYear,
        'SchoolID': this.logged_user.schoolId,
        'Medium': this.medium
      }
      console.log(params)
      this.restApiService.getByParameters(PathConstants.Question_Bank_Get, params).subscribe(res => {
        if (res !== undefined && res !== null) {
          if(res.length !== 0) {
          res.forEach(q => {
            if (q.Publishdate !== undefined && q.Publishdate !== null) {
              q.Pdate = this.datepipe.transform(q.Publishdate, 'dd/MM/yyyy');
            }
          })
          this.questionBankData = res;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
       } else {
          this.loading = false;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
    }
  }

  onEdit(row) {
    if (row !== undefined && row !== null) {
      this.year = row.QuestionYear;
      this.yearOptions = [{ label: row.ShortYear, value: row.QuestionYear }];
      this.medium = row.Medium;
      this.mediumOptions = [{ label: row.MediumName, value: row.Medium }];
      this.subject = row.subject;
      this.subjectOptions = [{ label: row.Subjectname, value: row.subject }];
      this.class = row.Classcode;
      this.classOptions = [{ label: row.Class, value: row.Classcode }];
      this.description = row.Description;
      this.publishDate = new Date(row.Publishdate);
    }
  }

  onDelete(index) {
    this.blockUI.start();
    if (index !== null && index !== undefined) {
      this.restApiService.put(PathConstants.Question_Bank_Delete, index).subscribe(res => {
        if (res !== undefined && res !== null) {
          if (res) {
            this.blockUI.stop();
            this.onLoadQuestionBank();
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
              summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.DeleteSuccessMsg
            });
          } else {
            this.blockUI.stop();
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
              summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
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
        this.loading = false;
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
    }
  }

  onRemoveFile() {
    this.fileSelector.nativeElement.value = null;
  }

  clearForm() {
    this._questionBankForm.reset();
    this._questionBankForm.form.markAsUntouched();
    this._questionBankForm.form.markAsPristine();
    this.filename = '';
    this.onRemoveFile();
  }
}
