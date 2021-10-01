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
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  dueDate: any = new Date();
  assignDate: any = new Date();
  types: SelectItem[];
  TypeOptions: SelectItem[]
  assignmentwork: string;
  AType:any;
  subjectname:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];
  assignmentfile: any[] = [];
  AssignmentDate:any;
  ClassWork: any;
  classId: any;
  MAssignId=0;
  public progress: number;
  public message: string;
  NewFileName:string;
  login_user: User;
  assign: string;
  classes?: any;
  sections?: any;
  sectionId: any;
  masterData?: any = [];
  sectionOptions: SelectItem[];
  classOptions: SelectItem[];
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _AssignmentForm: NgForm;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe
    ,private messageService: MessageService,private authService: AuthService,private masterService: MasterService) { }

  ngOnInit(): void {
    this.classes = this.masterService.getMaster('C');
    this.sections = this.masterService.getMaster('S');
    this.cols = [
      { field: 'AssignmentDate', header: 'Date', width: '200px'},
      { field: 'AssignmentDueDate', header: 'Due Date',  width: '200px'},
      { field: 'AssignmentWork', header: 'Assigned Work',  width: '200px'},
      { field: 'AssignmentType', header: 'Assigned Type',  width: '200px'},
      { field: 'Subjectname', header: 'Subject Name',  width: '200px' },  
  ];
  this.types = [
    { label: '-select-', value: null },
    { label: 'Home Work', value: 'Home Work'},
    { label: 'Class Work', value: 'Class Work'},
  ];
  this.login_user = this.authService.UserInfo; 
  }

  onSelect() {
    this.TypeOptions = this.types;
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
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
 
    const filename = fileToUpload.name + '^' + FileUploadConstant.Assignmentfolder;
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
    'AssignId': this.MAssignId,
    'SchoolID': this.login_user.schoolId,      
    'Class': this.classId.value,  
    'AssignmentDate': this.datepipe.transform(this.assignDate, 'MM/dd/yyyy') ,
    'AssignmentDueDate': this.datepipe.transform(this.dueDate, 'MM/dd/yyyy'),
    'assignmentwork': this.assignmentwork,
    'AssignmentType': this.AType.value,
    'subjectname': this.subjectname,
    'Assignmentfilename': this.NewFileName,
    'SectionId': this.sectionId.value,
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
    onSelect1(type) {
      let classSelection = [];
      let sectionSelection = [];
  
      switch (type) {
        case 'C':
          this.classes.forEach(c => {
            classSelection.push({ label: c.name, value: c.code })
          });
          let sortedClass = _.sortBy(classSelection, 'value');
          this.classOptions = sortedClass;
          this.classOptions.unshift({ label: '-select', value: null });
          break;
        case 'S':
          this.sections.forEach(s => {
            sectionSelection.push({ label: s.name, value: s.code })
          });
          this.sectionOptions = sectionSelection;
          this.sectionOptions.unshift({ label: '-select', value: null });
          break; 
      }
  
    }
onView() {
  const params = {
    'SchoolID': this.login_user.schoolId,
    'Class': this.login_user.classId, 
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
  // this.assignmentwork="",
  // this.AType="",
  // this.NewFileName="",
  // this.subjectname=""

}
onRowSelect(event, selectedRow) {
  this.MAssignId=selectedRow.AssignId;
  this.assignDate=selectedRow.AssignmentDate;
  this.dueDate = selectedRow.AssignmentDueDate;
  this.AType = { label: selectedRow.AssignmentType, value: selectedRow.AssignmentType };
  this.assignmentwork = selectedRow.AssignmentWork;
  this.assign = selectedRow.Assignmentfilename;
  this.TypeOptions= [{ label: selectedRow.AssignmentType, value: selectedRow.AssignmentType }];
  this.subjectname = selectedRow.Subjectname;
  this.NewFileName = selectedRow.Assignmentfilename;  
  this.sectionId = selectedRow.SectionId;
  console.log('t', this.AType);

}
onDownload(Filename) {
  const path = "../../assets/layout/"+FileUploadConstant.Assignmentfolder+"/"+Filename;
  saveAs(path, Filename);
}
}
