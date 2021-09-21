import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  dueDate: any = new Date();
  assignDate: any = new Date();
  assignmentwork: string;
  type:string;
  subjectname:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];
  assignmentfile: any[] = [];
  AssignmentDate:any;
  MAssignId=0;
  @BlockUI() blockUI: NgBlockUI;


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
    
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
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
    'AssignmentType': this.type,
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
  this.assignmentwork="",
  this.type="",
  this.subjectname=""

}
onRowSelect(event, selectedRow) {
  this.MAssignId=selectedRow.AssignId;
  this.assignDate=selectedRow.AssignmentDate;
  this.dueDate = selectedRow.AssignmentDueDate;
  this.assignmentwork = selectedRow.AssignmentWork;
  this.type = selectedRow.AssignmentType;
  this.subjectname = selectedRow.Subjectname;
  console.log(selectedRow.AssignId);
  

}


}
