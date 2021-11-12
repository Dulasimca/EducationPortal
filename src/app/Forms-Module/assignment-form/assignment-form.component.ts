import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { saveAs } from 'file-saver';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';


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
  Showtable: boolean;

  @Output() public onUploadFinished = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _AssignmentForm: NgForm;
  loading: boolean;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe
    ,private messageService: MessageService,private authService: AuthService,private masterService: MasterService
    ,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.masterService.getMaster('');
    this.cols = [
      { field: 'AssignmentDate', header: 'Date', width: '100px', align: 'center !important'},
      { field: 'AssignmentDueDate', header: 'Due Date',  width: '100px' ,align: 'center !important'},
      { field: 'AssignmentWork', header: 'Assigned Work',  width: '150px' ,align: 'left !important'},
      { field: 'AssignmentType', header: 'Assigned Type',  width: '150px' ,align: 'left !important'},
      { field: 'Subjectname', header: 'Subject Name',  width: '100px' ,align: 'left !important'},  
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
      this.classes = this.masterService.getMaster('C');
      this.sections = this.masterService.getMaster('S');  
      let classSelection = [];
      let sectionSelection = [];
  
      switch (type) {
        case 'C':
          this.classes.forEach(c => {
            classSelection.push({ label: c.name, value: c.code })
          });
          this.classOptions = classSelection;
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
  this.data = [];
  this.Showtable = true;
  this.loading = true;
  const params = {
    'SchoolID': this.login_user.schoolId,
    'Class': this.login_user.classId, 
  }
  this.restApiService.getByParameters(PathConstants.Assignment_Get, params).subscribe(res => {
    if(res !== null && res !== undefined && res.length !== 0) {
      this.loading =false;
    this.data = res;
      }else {
        this.loading = false;
        this.Showtable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
  });

}
clear() {
  this._AssignmentForm.reset();
  this._AssignmentForm.form.markAsUntouched();
  this._AssignmentForm.form.markAsPristine();
  this.data = [];
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
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
  const path = "../../assets/layout/"+FileUploadConstant.Assignmentfolder+"/"+Filename;
  saveAs(path, Filename);
},
reject: (type) => { }
});

}
}
