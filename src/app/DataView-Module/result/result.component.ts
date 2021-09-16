import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  
  years: year[];
  selectedyear: year;
  data: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.years = [
      { name: '2020-2021', code: '2021' },
      { name: '2021-2022', code: '2122' },
    ];
    this.data = [{ 'ID': 1, 'slno': 1, 'subject': 'Tamil', 'test': 'Pre-midterm Assessment' },
    { 'ID': 2,'slno': 2, 'subject': 'English', 'test': 'Pre-Mid Term Exam' },
    { 'ID': 3,'slno': 3, 'subject': 'Maths', 'test': 'Pre-Midterm' },
    { 'ID': 4,'slno': 4, 'subject': 'Science', 'test': 'Pre-Midterm Examination' },
    { 'ID': 5,'slno': 5, 'subject': 'Social Science', 'test': 'Pre-Midterm Examination' }]
  }

  onSignIn() {
    this.router.navigate(['/subjecttestresult']);
  }

}
interface year {
  name: string,
  code: string
}



