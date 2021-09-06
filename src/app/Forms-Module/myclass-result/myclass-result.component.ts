import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-myclass-result',
  templateUrl: './myclass-result.component.html',
  styleUrls: ['./myclass-result.component.css']
})
export class MyclassResultComponent implements OnInit {

  loginId: any;
  selectedStaff: any;
  staffName: SelectItem[];
  selectedClass: any;
  class: SelectItem[];
  selectedSection: any;
  section: SelectItem[];
  testName: any;
  yearRange: string;
  dos: any;
  selectedStudent: any;
  studentName: SelectItem[];
  result: any;
 


  constructor() { }

  ngOnInit(): void {
    this.loginId = 1
    ;
  }

  uploadData($event) {

  }

  
}
