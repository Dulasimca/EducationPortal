import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';
import { NgForm } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  MRowId: 0
  subject: number;
  subjectOptions: SelectItem[];
  subjects?: any;
  selectedYear: number;
  Author: string;
  yearOptions: SelectItem[];
  cols: any;
  form: any;
  classId: number;
  medium: string;
  mediumOptions: SelectItem[];
  classOptions: SelectItem[];
  classes?: any;
  years?: any;
  mediums?: any;
  data: any = [];
  uploadedFiles: any[] = [];
  Folder: any[] = [];
  showtable: boolean;
  NewFileName: string;
  login_user: User;
  loading: boolean;
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;
  public formData = new FormData();
  @ViewChild('f', { static: false }) _bookForm: NgForm;
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('fileSelector', { static: false }) _attachment: ElementRef;

  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private masterService: MasterService, private messageService: MessageService,
    private authService: AuthService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.years = this.masterService.getAccountingYear();
    this.masterService.getMaster('');
    this.login_user = this.authService.UserInfo;
    var data = [];
    if (this.years.length !== 0) {
      this.years.forEach(y => {
        data.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = data;
      this.selectedYear = data[0].value;
      // this.onview();
    }
    this.cols = TableConstants.BooksFormColumns;
  }
  onSelect(type) {
    this.years = this.masterService.getAccountingYear();
    this.classes = this.masterService.getMaster('C');
    this.subjects = this.masterService.getMaster('SB');
    this.mediums = this.masterService.getMaster('M');
    let classSelection = [];
    let mediumSelection = [];
    let subjectSelection = [];
    let yearSelection = [];
    switch (type) {
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        break;
      case 'M':
        this.mediums.forEach(m => {
          mediumSelection.push({ label: m.name, value: m.code })
        });
        this.mediumOptions = mediumSelection;
        this.mediumOptions.unshift({ label: '-select', value: null });
        break;
      case 'Y':
        this.years.forEach(y => {
          yearSelection.push({ label: y.ShortYear, value: y.Id });

        })
        this.yearOptions = yearSelection;
        this.yearOptions.unshift({ label: '-select-', value: null });
        break;
        case 'S':
          this.subjects.forEach(c => {
            if ((c.class * 1) === this.classId) {
              subjectSelection.push({ label: c.name, value: c.code })
            }
          });
          this.subjectOptions = subjectSelection;
          this.subjectOptions.unshift({ label: '-select', value: null });
          break;
    }
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    const filename = fileToUpload.name + '^' + FileUploadConstant.Booksfolder;
    this.formData.append('file', fileToUpload, filename);
    this.NewFileName = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => { }
      );
  }

  onSubmit() {
    this.blockUI.start();
    const params = {
      'RowId': this.MRowId,
      'SchoolId': this.login_user.schoolId,
      'ClassId': this.classId,
      'SubjectId': this.subject,
      'authorReference': this.Author,
      'Pdffilename': this.NewFileName,
      'Years': this.selectedYear,
      'medium': this.medium,
      'Flag': true,
    };
    this.restApiService.post(PathConstants.Book_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
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

  onView() {
    if (this.classId !== undefined && this.classId !== null && this.selectedYear !== null &&
      this.selectedYear !== undefined && this.medium !== null && this.medium !== undefined) {
      this.data = [];
      this.loading = true;
      this.showtable = true;
      const params = {
        'SchoolID': this.login_user.schoolId,
        'ClassId': this.classId,
        "Medium": this.medium
      }
      this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
        if (res !== null && res !== undefined && res.length !== 0) {
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

      });
    } else {
      this.messageService.clear();
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
        summary: ResponseMessage.SUMMARY_WARNING, detail: 'Please select class ,academic year & medium to view books'
      });
    }
  }

  onClear() {
    this._bookForm.reset();
    this._bookForm.form.markAsUntouched();
    this._bookForm.form.markAsPristine();
    this.yearOptions = [];
    this.selectedYear = null;
    this.classId = null;
    this.classOptions = [];
    this.subject = null;
    this.subjectOptions = [];
    this.Author = '';
    this.message = '';
    this.data = [];
    if (this._attachment.nativeElement.files.length === 0) {
      this._attachment.nativeElement.value = null;
    }
  }

  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.classId = selectedRow.ClassId;
    this.classOptions = [{label: selectedRow.ClassName, value: selectedRow.ClassId }];
    this.subject = selectedRow.SubjectId;
    this.subjectOptions = [{ label: selectedRow.SubjectName, value: selectedRow.SubjectId }];
    this.Author = selectedRow.authorReference;
    this.selectedYear = selectedRow.Years;
    this.yearOptions = [{ label: selectedRow.ShortYear, value: selectedRow.Years }];
    this.NewFileName = selectedRow.Pdffilename;
  }

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/" + FileUploadConstant.Booksfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}

