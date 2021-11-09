import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-myschool-view',
  templateUrl: './myschool-view.component.html',
  styleUrls: ['./myschool-view.component.css']
})
export class MyschoolViewComponent implements OnInit {
  curriculum:  any;
  headMasterName: string;
  email: any;
  address: any;
  pincode: number;
  phoneNo: number;
  landlineNo: number;
  faxNo: any;
  login_user: User;
  schoolName: string;
  userImage: any;
  public formData = new FormData();

  constructor(private restApiService: RestAPIService, private authService: AuthService, public _d: DomSanitizer, 
    private http: HttpClient) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    const params = {
      'SchoolId': this.login_user.schoolId,
    };
    this.restApiService.getByParameters(PathConstants.MySchool_Get, params).subscribe(response => {
      if(response !== undefined && response !== null) {
        this.schoolName = this.login_user.schoolname + ' - ' + this.login_user.taluk;
        response.forEach(i => {
          this.curriculum = i.Curriculum,
          this.headMasterName = (i.HMName !== undefined && i.HMName !== null) ? ((i.HMName.toString().trim() !== '') ? i.HMName : '-') : '-',
          this.email = (i.Emailid	 !== undefined && i.Emailid	 !== null) ? ((i.Emailid	.toString().trim() !== '') ? i.Emailid	 : '-') : '-',
          this.address = (i.Addressinfo	 !== undefined && i.Addressinfo	 !== null) ? ((i.Addressinfo	.toString().trim() !== '') ? i.Addressinfo	 : '-') : '-',
          this.pincode = (i.Pincode	 !== undefined && i.Pincode	 !== null) ? ((i.Pincode	.toString().trim() !== '') ? i.Pincode	 : '-') : '-',
          this.phoneNo = (i.Phone	 !== undefined && i.Phone	 !== null) ? ((i.Phone	.toString().trim() !== '') ? i.Phone	 : '-') : '-',
          this.landlineNo = (i.Landline	 !== undefined && i.Landline	 !== null) ? ((i.Landline	.toString().trim() !== '') ? i.Landline	 : '-') : '-',
          this.faxNo = (i.Fax	 !== undefined && i.Fax	 !== null) ? ((i.Fax	.toString().trim() !== '') ? i.Fax	 : '-') : '-';
          this.userImage = (i.Filename !== undefined && i.Filename !== null) ? (i.Filename.trim() !== '') ? 
          ('../../assets/layout/' + FileUploadConstant.SchoolFolder +'/'+i.Filename) : '' : '';
      })
      }
    });
  }
}
