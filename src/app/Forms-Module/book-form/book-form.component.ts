import { Component, OnInit,ViewChild  } from '@angular/core';
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
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

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
  ClassId: any;
  medium: string;
  mediumOptions: SelectItem[];
  classOptions: SelectItem[];
  classes?: any;
  mediums?: any;
  data: any = [];
  uploadedFiles: any[] = [];
  Folder:any[]=[];
  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;
  showtable: boolean;

   NewFileName:string;
  public formData = new FormData();
  @ViewChild('f', { static: false }) _bookForm: NgForm;
  login_user: User;
  @Output() public onUploadFinished = new EventEmitter();
  loading: boolean;
  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService,
    private authService: AuthService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  
    this.masterService.getMaster('');
    this.login_user = this.authService.UserInfo;
    this.yearOptions = [
      //{ label: '2019-2020', value: '2019-2020' },
      { label: '2020-2021', value: '2020-2021' },
      { label: '2021-2022', value: '2021-2022' },
      { label: '2021-2023', value: '2021-2024' },
    ];
    this.cols = [
     // {field:'RowId',header: 'ID'},
      {field: 'Years',header: 'Year'},
      {field: 'Class2',header:'Class'},
      {field: 'medium',header:'Medium'},
      {field:'subjects',header: 'Subject'},
      {field: 'authorReference',header: 'Author/Reference', width: '300px'},
   //   {field: 'Pdffilename',header: 'Book Name'},
      {field: 'CreatedDate',header: 'Uploaded date'},
      
      
    ];
  }
  onSelect(type) {
    this.classes = this.masterService.getMaster('C');
    this.mediums = this.masterService.getMaster('M');
    let classSelection = [];
    let mediumSelection = [];
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
      'SchoolId': this.login_user.schoolId,
      'ClassId':  this.ClassId.value,
      'subjects': this.Subject,     
      'authorReference': this.Author,
      'Pdffilename': this.NewFileName,  
      'Years': this.selectedyear, 
      'medium': this.medium,  
      'Flag': true,  
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
    this.data = [];
    this.loading = true;
    this.showtable = true;
    const params = { 
      'SchoolID': this.login_user.schoolId,
    }
    
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        this.loading=false;
        this.data = res;
      }else {
        this.loading = false;
        this.showtable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
      
    });

  }
  onClear()
  {
    this._bookForm.reset();
    this._bookForm.form.markAsUntouched();
    this._bookForm.form.markAsPristine();
    this.yearOptions = [];
    this.Subject = '',
    this.Author = '',
    this.selectedyear = '',
    this.message =''
    this.data = [];
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;

    let classSelection = [];
    this.classes.forEach(c => {
      if(selectedRow.ClassId==c.code)
      classSelection.push({ label: c.name, value: c.code })
    });
    
    this.classOptions = classSelection;
    this.Author = selectedRow.authorReference;
    this.Subject = selectedRow.subjects;
    this.selectedyear = selectedRow.Years;
    this.NewFileName=selectedRow.Pdffilename;
}
onDownload(Filename) {
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
  const path = "../../assets/layout/"+FileUploadConstant.Booksfolder+"/"+Filename;
  saveAs(path, Filename);
},
reject: (type) => { }
});

}
}

