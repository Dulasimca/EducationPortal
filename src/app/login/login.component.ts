import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';
import { MasterService } from '../Services/master-data.service';
import { ResponseMessage } from '../Common-Module/Message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService) { }
  username: string;
  password: string;
  id: number;
  showPswd: boolean;
  ngOnInit() {
    if(document.getElementById('side-nav-bar') !== null && document.getElementById('main-layout') !== undefined) {
    document.getElementById('side-nav-bar').style.display = 'none';
    document.getElementById('main-layout').className = 'layout-wrapper-initial';
    }
  }

  onSignIn() {
    const params = { 'Value': this.username.trim(), 'Type': '2' };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if(response !== undefined && response !== null && response.length !== 0) {
        response.forEach(i => {
          if(i.EmailId === this.username.trim() && i.password === this.password.trim()) {
            const obj: User = {
              username: (i.FirstName !== undefined && i.FirstName !== null) ? i.FirstName.toString().trim(): '',
              lastname: (i.LastName !== undefined && i.LastName !== null) ? i.LastName.toString().trim() : '',
              password: this.password.trim(),
              id: (i.slno !== undefined) ? i.slno : null,
              email: this.username.trim(),
              schoolId: (i.SchoolId !== undefined) ? i.SchoolId : null,
              classId: (i.ClassId !== undefined) ? i.ClassId : null,
              sectioncode: (i.SectionId !== undefined) ? i.SectionId : null,
              roleId: (i.RoleId !== undefined) ? i.RoleId : null,
              fathername: (i.FatherName !== undefined && i.FatherName !== null) ? i.FatherName.toString().trim() : '',
              class: (i.Class !== undefined && i.Class !== null) ? i.Class.toString().trim(): '',
              section: (i.Section !== undefined && i.Section !== null) ? i.Section.toString().trim(): '',
       
            }
            this.authService.login(obj);
            console.log('obj', obj);
            this.masterService.initializeMaster();
          } else {
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
              summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.LoginFailed
            });         
           }
        })
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_INFO,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });         
       }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
   }

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if(inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }

}
