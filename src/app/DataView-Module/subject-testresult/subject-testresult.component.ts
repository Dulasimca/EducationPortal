import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
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
  @Output() public close = new EventEmitter();
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    this.class = this.login_user.classRoman + ' - ' + this.login_user.section;
      this.studentName = this.login_user.username;
      this.rollNo = this.login_user.id;
  }
  
  onClose() {
    this.close.emit();
  }
  }


