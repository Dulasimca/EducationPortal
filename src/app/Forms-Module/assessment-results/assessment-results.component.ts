import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-assessment-results',
  templateUrl: './assessment-results.component.html',
  styleUrls: ['./assessment-results.component.css']
})
export class AssessmentResultsComponent implements OnInit {

  selectedStudent: any;
  studentName: SelectItem[];
  selectedClass: any;
   class: SelectItem[];
  selectedSection: any;
  section: SelectItem[];
  testName: any;
  selectedSubject: any;
  subjects: SelectItem[];



  constructor() { }

  ngOnInit(): void {
  }

}
