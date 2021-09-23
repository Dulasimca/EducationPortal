import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';
import { MasterService } from '../Services/master-data.service';
import { ResponseMessage } from '../Common-Module/Message';
import { StyleSetting } from '../Helper-Module/style-setting';
import { AppComponent } from '../app.component';

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
    var _setlayout = new StyleSetting();
    _setlayout.setNavLayoutAtLogin();
  }

  onSignIn() {
    const params = { 'Value': this.username.trim(), 'Type': '2' };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if(response !== undefined && response !== null && response.length !== 0) {
        response.forEach(i => {
          var response_email = (i.EmailId !== undefined && i.EmailId !== null) ? i.EmailId.toString().toLowerCase().trim() : '';
          var response_pwd = (i.password !== undefined && i.password !== null) ? i.password.toString().toLowerCase().trim() : '';
          if(response_email === this.username.toLowerCase().trim() && response_pwd === this.password.toLowerCase().trim()) {
            const obj: User = {
              username: i.FirstName,
              lastname: i.LastName,
              password: this.password.trim(),
              id: i.slno,
              email: this.username.trim(),
              schoolId: i.SchoolId,
              classId: i.ClassId,
              sectioncode: i.SectionId,
              roleId: i.RoleId
            }
            this.authService.login(obj);
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
