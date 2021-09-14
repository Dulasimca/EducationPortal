import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  dueDate: Date = new Date();
  assignDate: Date = new Date();
  assignmentwork: string;
  type:string;
  subjectname:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];
  assignmentfile: any[] = [];
  AssignmentDate:any;
  MAssignId=0;


  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,) { }

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
   
  const params = {
    'AssignId': this.MAssignId,
    'SchoolID': 1,      
    'Class': 1,     
    'AssignmentDate': this.assignDate,
    'AssignmentDueDate': this.dueDate,
    'assignmentwork': this.assignmentwork,
    'AssignmentType': this.type,
    'subjectname': this.subjectname,
    'Flag' : true

  };
  console.log(params);
  this.restApiService.post(PathConstants.Assignment_Post, params).subscribe(res => {
    console.log('rs', res);
   
  });
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
