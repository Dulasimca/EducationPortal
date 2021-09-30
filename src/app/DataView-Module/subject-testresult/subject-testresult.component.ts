import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-subject-testresult',
  templateUrl: './subject-testresult.component.html',
  styleUrls: ['./subject-testresult.component.css']
})
export class SubjectTestresultComponent implements OnInit {

  studentName: string;
  class: any;
  rollNo: any;
  login_user: User;
  

  constructor(private restApiService: RestAPIService) { }

  ngOnInit() {
    const params = {
      'studentName': this.login_user.username,
      'class': this.login_user.class,
      'rollNo': this.login_user.id
    }

    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
        if(res) {
      console.log('rs',res);
      }
    }
    });
  
  }
  }


