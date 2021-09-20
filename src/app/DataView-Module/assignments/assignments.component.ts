import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  data: any = []; 
  cols: any;
  
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'AssignId', header: 'ID'},
      { field: 'AssignmentDate', header: 'Date' },
      { field: 'AssignmentDueDate', header: 'Due Date' },
      { field: 'AssignmentWork', header: 'Assigned Work' },
      { field: 'AssignmentType', header: 'Assigned Type' },
      { field: 'Subjectname', header: 'Subject Name' },
      

    
  ];

    this.onView()
    // this.data = [ {'slno': 1,'create': '20-08-2021', 'subject': 'Science', 'date': '30-08-2021', 'work': 'Plant Anatomy, Animal Husbandry, Quantum Physics, Acids & Bases unit ', 'type': 'Class Work'},
    // {'slno': 2, 'create': '28-08-2021','subject': 'English', 'date': '03-09-2021', 'work': 'Grammatical Part & Essay Part', 'type': 'Home Work'},
    // {'slno': 3, 'create': '5-09-2021','subject': 'Maths', 'date': '10-09-2021', 'work': 'Algebra unit', 'type': 'Notes' },
    // {'slno': 4, 'create': '6-09-2021', 'subject': 'Tamil', 'date': '12-09-2021', 'work': 'Ilakkanam topic', 'type': 'Home test' },
    // {'slno': 5, 'create': '12-09-2021','subject': 'Social Science', 'date': '14-09-2021', 'work': 'History of Aryans, Geology topics.', 'type': 'Home Work' }]
  }
  uploadData($event) {
  
    
  }
  onDownload() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8';
    const path = "../../assets/files/Assignment.pdf";
    const filename = 'Assignment_Pdf' + ".pdf";
    saveAs(path, filename);
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




}
