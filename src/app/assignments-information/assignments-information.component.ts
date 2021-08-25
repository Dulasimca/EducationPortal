import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments-information',
  templateUrl: './assignments-information.component.html',
  styleUrls: ['./assignments-information.component.css']
})
export class AssignmentsInformationComponent implements OnInit {
  date: Date = new Date();
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.data = [ {'slno': 1,
                  'Teacher': ' Subject Maths', 
                  'subjet': 'Std X ', 
                  'marks': 'Std X Home Work', 
                  'time': 'Start Date : 10-05-2021 End Date : 31-03-2022', 
                  'Attachment': '1 hr' },

    //{'slno': 2, 'test': 'Cyclic Test', 'marks': '25', 'subject': 'English', 'time': '9.30 AM', 'duration': '30 mins' }
  ];
  }



}