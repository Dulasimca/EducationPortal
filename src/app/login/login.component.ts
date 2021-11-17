import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';
import { ResponseMessage } from '../Common-Module/Message';
import { StyleSetting } from '../Helper-Module/style-setting';
import { TabView } from 'primeng/tabview';
import { FileUploadConstant } from '../Common-Module/file-upload-constant';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  id: number;
  showPswd: boolean;
  loginHeader: string = 'Student Login';
  selectedIndex = 0;
  isChecked: boolean;
  login_user: User;
  @ViewChild('tabview', { static: false }) _tabView: TabView;
  @ViewChild('f', { static: false }) _loginForm: NgForm;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService) {
     }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    const remember = this.authService.RememberUser;
    this.username , this.password = "";
    console.log('rem', remember, this.authService.RememberUser)
    var _setlayout = new StyleSetting();
    _setlayout.setNavLayoutAtLogin();
    this.isChecked = (remember !== undefined && remember !== null) ?
    remember.checked : false;
    if(this.isChecked) {
    this.username = remember.usermail;
    this.password = remember.password;
    } else{
      this.username = "";
      this.password = "";
    }
    console.log('usr', this.username, this.password)
  }

  onSignIn() {
    if (this.username.trim() !== '' && this.password.trim() !== '') {
      let role;
      if (this.selectedIndex === 0) {
        role = 6;
      } else if (this.selectedIndex === 1) {
        role = 5;
      } else {
        role = 3;
      }
      const params = {
        'Value': this.username.trim(),
        'Type': '2',
        'RoleId': role,
        'Password': this.password.trim()
      };
      this.restApiService.getByParameters(PathConstants.Login, params).subscribe(response => {
        if(response !== undefined && response !== null) {
          if(response.item1) {
            if (response.item3.length !== 0) {
              response.item3.forEach(i => {
                var folderName = ((i.roleId * 1) === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration;
                const obj: User = {
                    username: (i.firstName !== undefined && i.firstName !== null) ? i.firstName.toString().trim() : '',
                    lastname: (i.lastName !== undefined && i.lastName !== null) ? i.lastName.toString().trim() : '',
                    password: (i.encrptedPwd !== undefined && i.encrptedPwd !== null) ? i.encrptedPwd.toString().trim() : '',
                    id: (i.slno !== undefined) ? i.slno : null,
                    email: (i.emailId !== undefined && i.emailId !== null) ? i.emailId.toString().trim() : '',
                    schoolId: (i.schoolId !== undefined) ? i.schoolId : null,
                    classRoman: (i.classname2 !== undefined && i.classname2 !== null) ? i.classname2.toString().trim()  : '',
                    classId: (i.classId !== undefined) ? i.classId : null,
                    sectioncode: (i.sectionId !== undefined) ? i.sectionId : null,
                    section: (i.sectionName !== undefined && i.sectionName !== null) ? i.sectionName.toString().trim()  : '',
                    roleId: (i.roleId !== undefined) ? i.roleId : null,
                    fathername: (i.fatherName !== undefined && i.fatherName !== null) ? i.fatherName.toString().trim() : '',
                    medium: (i.mediumName !== undefined && i.mediumName !== null) ? i.mediumName.toString().trim() : '',
                    mediumId: (i.medium !== undefined) ? i.medium : null,
                    district: (i.districname !== undefined && i.districname) ? i.districname.toString().trim() : '',
                    distrctId: (i.districtId !== undefined) ? i.districtId : null,
                    schoolname: (i.schoolname !== undefined && i.schoolname !== null) ? i.schoolname.toString().trim() : '',
                    taluk: (i.talukname !== undefined && i.talukname !== null) ? i.talukname.toString().trim() : '',
                    talukId: (i.taluk !== undefined && i.taluk !== null) ? i.taluk : '',
                    pincode: (i.postalcode !== undefined && i.postalcode !== null) ? i.postalcode.toString().trim() : '',
                    studentImg: (i.studentPhotoFileName !== undefined && i.studentPhotoFileName !== null) ?
                    (i.studentPhotoFileName.toString().trim() !== '' ? ('../../assets/layout/' + folderName +'/'+ i.studentPhotoFileName) : '') : '' 
                  }
                  this.authService.login(obj);
                  const rememberUser = {
                    'checked': this.isChecked,
                    'usermail': (this.isChecked) ? this.username : "",
                    'password': (this.isChecked) ? this.password : ""
                  }
                  this.authService.setUserChecked(rememberUser);       
               });
            }
          } else {
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
              summary: ResponseMessage.SUMMARY_ERROR, detail: response.item2
            });
          }
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_WARNING, detail:  response.item2
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
    this._loginForm.reset();
    this._loginForm.form.markAsUntouched();
    this._loginForm.form.markAsPristine();
  }

  rememberUser($event) {
    const rememberUser = {
      'checked': $event.checked,
      'usermail': ($event.checked) ? this.username : "",
      'password': $event.checked? this.password : ""
    }
    this.authService.setUserChecked(rememberUser);
  }

}
