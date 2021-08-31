import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myclass-result',
  templateUrl: './myclass-result.component.html',
  styleUrls: ['./myclass-result.component.css']
})
export class MyclassResultComponent implements OnInit {

  loginId: any;
  selectedStaff: any;
  staffName: any;
  selectedClass: any;
  class: any;
  selectedSection: any;
  section: any;
  testName: any;
  yearRange: string;
  dos: any;
  selectedStudent: any;
  studentName: any;


  constructor() { }

  ngOnInit(): void {
    this.loginId = 1;
  }

}
