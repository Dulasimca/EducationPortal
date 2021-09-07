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
  subName:string;

  data: any = []; 
  cols: any;

  uploadedFiles: any[] = [];
  

  assignmentfile: any[] = [];


  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

onSubmit() {
   
  const params = {
    'AssignId': 0,
    'SchoolID': 1,      
    'Class': 1,     
    'AssignmentDate': this.assignDate, // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
    'AssignmentDueDate': this.dueDate,
    'AssignmentType': '123.png',
    'Flag' : true

  };

  
  console.log(params);
  this.restApiService.post(PathConstants.Assignment_Post, params).subscribe(res => {
    console.log('rs', res);
  });
}

}
