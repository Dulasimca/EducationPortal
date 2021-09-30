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
import { FileUploadConstant } from '../Common-Module/file-upload-constant';

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
                  const obj: User = {
                    username: (i.firstName !== undefined && i.firstName !== null) ? i.firstName.toString().trim() : '',
                    lastname: (i.lastName !== undefined && i.lastName !== null) ? i.lastName.toString().trim() : '',
                    password: (i.encrptedPwd !== undefined && i.encrptedPwd !== null) ? i.encrptedPwd.toString().trim() : '',
                    id: (i.slno !== undefined) ? i.slno : null,
                    email: (i.emailId !== undefined && i.emailId !== null) ? i.emailId.toString().trim() : '',
                    schoolId: (i.schoolId !== undefined) ? i.schoolId : null,
                    classId: (i.classId !== undefined) ? i.classId : null,
                    sectioncode: (i.sectionId !== undefined) ? i.sectionId : null,
                    roleId: (i.roleId !== undefined) ? i.roleId : null,
                    fathername: (i.fatherName !== undefined && i.fatherName !== null) ? i.fatherName.toString().trim() : '',
                    class: (i.class !== undefined && i.class !== null) ? i.class.toString().trim() : '',
                    section: (i.section !== undefined && i.section !== null) ? i.section.toString().trim() : '',
                    medium: (i.mediumName !== undefined && i.mediumName !== null) ? i.mediumName.toString().trim() : '',
                    mediumId: (i.medium !== undefined) ? i.medium : null,
                    district: (i.districname !== undefined && i.districname) ? i.districname.toString().trim() : '',
                    distrctId: (i.districtId !== undefined) ? i.districtId : null,
                    schoolname: (i.schoolname !== undefined && i.schoolname !== null) ? i.schoolname.toString().trim() : '',
                    taluk: (i.taluk !== undefined && i.taluk !== null) ? i.taluk.toString().trim() : '',
                    talukId: (i.city !== undefined && i.city !== null) ? i.city.toString().trim() : '',
                    pincode: (i.postalcode !== undefined && i.postalcode !== null) ? i.postalcode.toString().trim() : '',
                    studentImg: (i.studentPhotoFileName !== undefined && i.studentPhotoFileName !== null) ?
                    (i.studentPhotoFileName.toString().trim() !== '' ? ('../../assets/layout/' + FileUploadConstant.StudentRegistration +'/'+ i.studentPhotoFileName) : '') : '' 
                  }
                  this.authService.login(obj);
                  console.log('au', obj);
                  this.masterService.initializeMaster();
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
    this.loginForm.reset();
  }

}
