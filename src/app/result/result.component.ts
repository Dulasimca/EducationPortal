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
    this.data = [{ 'slno': 1, 'subject': 'Tamil', 'test': 'Pre-midterm Assessment' },
    { 'slno': 2, 'subject': 'English', 'test': 'Pre-Mid Term Exam' },
    { 'slno': 3, 'subject': 'Maths', 'test': 'Pre-Midterm' },
    { 'slno': 4, 'subject': 'Science', 'test': 'Pre-Midterm Examination' },
    { 'slno': 5, 'subject': 'Social Science', 'test': 'Pre-Midterm Examination' }]
  }

  onSignIn() {
    this.router.navigate(['/subjecttestresult']);
  }

}
interface year {
  name: string,
  code: string
}



