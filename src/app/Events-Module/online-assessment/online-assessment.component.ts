import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-assessment',
  templateUrl: './online-assessment.component.html',
  styleUrls: ['./online-assessment.component.css']
})
export class OnlineAssessmentComponent implements OnInit {
date: Date = new Date();
data: any = [];

constructor() { }

ngOnInit() {
    this.data = [ {'slno': 1, 'test': 'Mid-Term', 'marks': '50', 'subject': 'Tamil', 'time': '8.30 AM', 'duration': '1 hr' },
    {'slno': 2, 'test': 'Cyclic Test', 'marks': '25', 'subject': 'English', 'time': '9.30 AM', 'duration': '30 mins' }
  ];
  }
}
