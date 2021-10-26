import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-subject-result',
  templateUrl: './subject-result.component.html',
  styleUrls: ['./subject-result.component.css']
})
export class SubjectResultComponent implements OnInit {
  years: year[];
  selectedyear: year;
  data: any = [];
  display : boolean = false;
  // studentName: string;
  // class: any;
  // rollNo: any;
  // login_user: User;

  constructor(private router: Router, private restApiService: RestAPIService) { }

  ngOnInit() {
    // const params = {
    //   'studentName': this.login_user.username,
    //   'class': this.login_user.class,
    //   'rollNo': this.login_user.id
    // }

    // this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
    //   if(res !== null && res !== undefined && res.length !== 0) {
    //     if(res) {
    //   console.log('rs',res);
    //   }
    // }
    // });
  
  
    this.years = [
      { name: '2020-2021', code: '2021' },
      { name: '2021-2022', code: '2122' },
    ];
    this.data = [{ 'slno': 1, 'subject': 'Tamil', 'test': 'Mid-Term Assessment' },
    { 'slno': 2, 'subject': 'English', 'test': 'Pre-Mid Term Exam' },
    { 'slno': 3, 'subject': 'Maths', 'test': 'Pre-Midterm' },
    { 'slno': 4, 'subject': 'Science', 'test': 'Pre-Midterm Examination' },
    { 'slno': 5, 'subject': 'Social Science', 'test': 'Pre-Midterm Examination' },
    { 'slno': 6, 'subject': 'french', 'test': 'Pre-Midterm Examination' },
    { 'slno': 7, 'subject': 'Hindi', 'test': 'Pre-Midterm Examination' },
    { 'slno': 8, 'subject': 'Artificial Intelligence', 'test': 'Pre-Midterm Examination' },
    ]
  }

  onView() {
    this.display = true;
  }

}



interface year {
  name: string,
  code: string
}




