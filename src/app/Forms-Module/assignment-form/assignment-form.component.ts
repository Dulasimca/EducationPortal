import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { saveAs } from 'file-saver';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  dueDate: any = new Date();
  assignDate: any = new Date();
  TypeOption: SelectItem[]
  assignmentwork: string;
  AType:any;
  subjectname:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];
  assignmentfile: any[] = [];
  AssignmentDate:any;
  ClassWork: any;
  MAssignId=0;
  public progress: number;
  public message: string;
  NewFileName:string;
  login_user: User;
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _AssignmentForm: NgForm;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'AssignId', header: 'ID'},
      { field: 'AssignmentDate', header: 'Date' },
      { field: 'AssignmentDueDate', header: 'Due Date' },
      { field: 'AssignmentWork', header: 'Assigned Work' },
      { field: 'AssignmentType', header: 'Assigned Type' },
      { field: 'Subjectname', header: 'Subject Name' }
    
  ];
  this.TypeOption = [
    { label: '-select-', value: null },
    { label: 'Home Work', value: 'Home Work'},
    { label: 'Class Work', value: 'Class Work'},
  ];
    
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const params = {
    
      'AssignId': this.MAssignId,
      'SchoolID': 1,      
      'Class': 1,    
      'AssignmentDate': this.datepipe.transform(this.assignDate, 'MM/dd/yyyy') ,
      'AssignmentDueDate': this.datepipe.transform(this.dueDate, 'MM/dd/yyyy'),
      'assignmentwork': this.assignmentwork,
      'AssignmentType': this.AType.value,
      'subjectname': this.subjectname,
      'Flag' : true
      
      
     
    };
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    let folderOptions=<FolderOptions>params[0];
 
    const filename = fileToUpload.name + '^' + FileUploadConstant.Assignmentfolder;
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
    'AssignId': this.MAssignId,
    'SchoolID': 1,      
    'Class': 1,    
    'AssignmentDate': this.datepipe.transform(this.assignDate, 'MM/dd/yyyy') ,
    'AssignmentDueDate': this.datepipe.transform(this.dueDate, 'MM/dd/yyyy'),
    'assignmentwork': this.assignmentwork,
    'AssignmentType': this.AType.value,
    'subjectname': this.subjectname,
    'Flag' : true

  };
  console.log(params);
  this.restApiService.post(PathConstants.Assignment_Post, params).subscribe(res => {
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
  const params = {
    'SchoolID': 1,
    'Class': 1 
  }
  this.restApiService.getByParameters(PathConstants.Assignment_Get, params).subscribe(res => {
    if(res !== null && res !== undefined && res.length !== 0) {
    console.log( res);
    this.data = res;
    }
  });

}
clear() {
  this._AssignmentForm.reset();
  this._AssignmentForm.form.markAsUntouched();
  this._AssignmentForm.form.markAsPristine();
  this.assignmentwork="",
  this.AType="",
  this.subjectname=""

}
onRowSelect(event, selectedRow) {
  this.MAssignId=selectedRow.AssignId;
  this.assignDate=selectedRow.AssignmentDate;
  this.dueDate = selectedRow.AssignmentDueDate;
  this.assignmentwork = selectedRow.AssignmentWork;
  this.TypeOption= [{ label: selectedRow.AssignmentType, value: selectedRow.AssignmentType }];
  this.subjectname = selectedRow.Subjectname;
  

}
onDownload(Filename) {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
  const path = "../../assets/layout/"+FileUploadConstant.Assignmentfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
}
}
interface FolderOptions {
  FolderPath?: string;
}
