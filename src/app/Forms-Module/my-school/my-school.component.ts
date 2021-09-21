import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent implements OnInit {
  curriculumOptions:  SelectItem[];
  headMasterName: string;
  email: any;
  address: any;
  pincode: number;
  phoneNo: number;
  landlineNo: number;
  login_user: User;
  faxNo: any;
  curriculum: any;

  constructor(private restApiService: RestAPIService, private messageService: MessageService,
     private authService: AuthService) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.curriculumOptions = [
      { label: 'Stateboard', value: '01' },
      { label: 'CBSE', value: '02' },
    ]
    
  }
  onSave() {
    const params = {
      'Slno': 0,    
      'Curriculum': this.curriculum.label,
      'HMName': this.headMasterName,
      'Emailid': this.email,
      'Addressinfo': this.address,
      'Phone': this.phoneNo,
      'Pincode': this.pincode,
      'Landline': this.landlineNo,
      'Fax': this.faxNo,
      'SchoolId': this.login_user.schoolId,
      'Flag': 1
    }
    this.restApiService.post(PathConstants.MySchool_Post,params).subscribe(res => {
      console.log('')
      if (res) {
        // this.clearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
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
  }
  

}
