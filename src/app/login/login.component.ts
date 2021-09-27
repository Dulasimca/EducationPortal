import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';
import { MasterService } from '../Services/master-data.service';
import { ResponseMessage } from '../Common-Module/Message';
import { StyleSetting } from '../Helper-Module/style-setting';
import { TabView } from 'primeng/tabview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  id: number;
  showPswd: boolean;
  loginHeader: string = 'Student Login';
  selectedIndex = 0;
  loginForm: FormGroup;           
  @ViewChild('tabview', { static: false }) _tabView: TabView;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService
    , private fb: FormBuilder) { }

  ngOnInit() {
    var _setlayout = new StyleSetting();
    _setlayout.setNavLayoutAtLogin();
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  onSignIn() {
    if(this.username.trim() !== '' && this.password.trim() !== '') {
    const params = { 'Value': this.username.trim(), 'Type': '2' };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if (response !== undefined && response !== null && response.length !== 0) {
        response.forEach(i => {
        //  if(this.selectedIndex)
          var response_email = (i.EmailId !== undefined && i.EmailId !== null) ? i.EmailId.toString().toLowerCase().trim() : '';
          var response_pwd = (i.password !== undefined && i.password !== null) ? i.password.toString().toLowerCase().trim() : '';
          if (response_email === this.username.toLowerCase().trim() && response_pwd === this.password.toLowerCase().trim()) {
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
              medium: (i.MediumName !== undefined && i.MediumName !== null) ? i.MediumName.toString().trim() : '',
              mediumId: (i.Medium !== undefined) ? i.Medium : null,
              district: (i.Districname !== undefined && i.Districname) ? i.Districname.toString().trim() : '',
              distrctId: (i.DistrictId !== undefined) ? i.DistrictId : null,
              schoolname: (i.Schoolname !== undefined && i.Schoolname !== null) ? i.Schoolname.toString().trim() : '',
              taluk: (i.Taluk !== undefined && i.Taluk !== null) ? i.Taluk.toString().trim() : '',
              talukId: (i.City !== undefined && i.City !== null) ? i.City.toString().trim() : '',
              pincode: (i.Postalcode !== undefined && i.Postalcode !== null) ? i.Postalcode.toString().trim() : ''

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
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
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
  } else {
    this.messageService.clear();
    this.messageService.add({
      key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
      summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.LoginFailed
    });
  }
  }

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if (inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }

  onTabChange($event) {
    this.selectedIndex = $event.index;
    this.loginHeader = this._tabView.tabs[this.selectedIndex].header + ' ' + 'Login';
    this.loginForm.reset();
  }

}
