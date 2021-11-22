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
import { TableConstants } from 'src/app/Common-Module/TableConstants';


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
  AType:number;
  subjectname:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];
  assignmentfile: any[] = [];
  AssignmentDate:any;
  ClassWork: any;
  classId: string;
  MAssignId=0;
  public progress: number;
  public message: string;
  NewFileName:string;
  login_user: User;
  assign: string;
  classes?: any;
  assignmenttype?: any;
  sections?: any;
  sectionId: number;
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
    this.cols = TableConstants.AssignmentColumns;
  this.login_user = this.authService.UserInfo; 
  }


onSubmit() {
  this.blockUI.start();
  const params = {
    'AssignId': this.MAssignId,
    'SchoolID': this.login_user.schoolId,      
    'Class': this.classId,  
    'AssignmentDate': this.datepipe.transform(this.assignDate, 'MM/dd/yyyy') ,
    'AssignmentDueDate': this.datepipe.transform(this.dueDate, 'MM/dd/yyyy'),
    'assignmentwork': this.assignmentwork,
    'AssignmentType': this.AType,
    'subjectname': this.subjectname,
    'Assignmentfilename': this.NewFileName,
    'SectionId': this.sectionId,
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
      this.assignmenttype = this.masterService.getMaster('AT');
      let classSelection = [];
      let sectionSelection = [];
      let assignmentSelection = [];
  
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
          case 'AT':
            this.assignmenttype.forEach(s => {
              assignmentSelection.push({ label: s.name, value: s.code })
            });
            this.TypeOptions = assignmentSelection;
            this.TypeOptions.unshift({ label: '-select', value: null });
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
      res.forEach(r => {
        r.Class = r.ClassName + ' - ' + r.SectionName;
      })
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
  this.assignDate = new Date();
  this.dueDate = new Date();
  this.classId = null;
  this.classOptions = [];
  this.sectionId = null;
  this.sectionOptions = [];
  this.AType = null;
  this.TypeOptions = [];

}
onRowSelect(event, selectedRow) {
  this.MAssignId=selectedRow.AssignId;
  this.assignDate= new Date(selectedRow.AssignmentDate);
  this.dueDate = new Date (selectedRow.AssignmentDueDate);
  this.assignmentwork = selectedRow.AssignmentWork;
  this.assign = selectedRow.Assignmentfilename;
  this.subjectname = selectedRow.Subjectname;
  this.NewFileName = selectedRow.Assignmentfilename;  
  this.sectionId = selectedRow.SectionId;
  this.sectionOptions = [{ label: selectedRow.SectionName, value: selectedRow.SectionId }];
  this.classId = selectedRow.ClassId;
  this.classOptions = [{ label: selectedRow.ClassName, value: selectedRow.ClassId }];
  this.AType = selectedRow.AssignmentType;
  this.TypeOptions = [{ label: selectedRow.AssignmentName, value: selectedRow.AType }];
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
