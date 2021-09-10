import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';

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


  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cols = [
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
    'AssignId': 0,
    'SchoolID': 1,      
    'Class': 1,     
    'AssignmentDate': this.assignDate, // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
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
onEdit(rowData) {

}
onDelete(rowData) {

}
clear() {
  this.assignmentwork="",
  this.type="",
  this.subjectname=""

}


}
