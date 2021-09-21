import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-download',
  templateUrl: './classroom-download.component.html',
  styleUrls: ['./classroom-download.component.css']
})
export class ClassroomDownloadComponent implements OnInit {
  date: Date = new Date();
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.data = [ {'ID':1, 'slno': 1, 'subject': 'Tamil',  'duration': '45 mins' },
    {'ID':2, 'slno': 2, 'subject': 'English',  'duration': '45 mins' },
    {'ID':3, 'slno': 3, 'subject': 'Maths',  'duration': '45 mins' },
    {'ID':4, 'slno': 4, 'subject': 'Science',  'duration': '45 mins' },
    {'ID':5, 'slno': 5, 'subject': 'Social Science',  'duration': '45 mins' }]
  }
}