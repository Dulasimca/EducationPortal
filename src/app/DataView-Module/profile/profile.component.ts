import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { Profile } from 'src/app/Interfaces/profile';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  class: any;
  section: any;
  rollNo: any;
  dob: any;
  doj: any;
  emailId: any;
  fatherContact: number;
  motherContact: number;
  guardian: any;
  bloodGroup: any;
  address: any;
  photo: any;
  responseData: Profile;
  userImage: string;
  
  constructor(private authService: AuthService, private restApiService: RestAPIService, private router: Router, private userService: UserService) { }

  ngOnInit() { 
    const user: User = this.authService.UserInfo;
    const params = { 'Value': user.email, 'Type': '2', 'SchoolId': user.schoolId, 'RoleId': user.roleId };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if(response !== undefined && response !== null && response.length !== 0) {
        response.forEach(i => {
          for(var j in i) {
            if(i[j] === null || i[j] === undefined) {
              i[j] = '';
            }
          }
          var folderName = ((i.RoleId * 1) === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration;
          this.name = (i.FirstName !== undefined && i.FirstName !== null) ? ((i.FirstName.toString().trim() !== '') ? i.FirstName : '-') : '-',
          this.class = (i.Classname2 !== undefined && i.Classname2 !== null) ? ((i.Classname2.toString().trim() !== '') ? i.Classname2 : '-') : '-',
          this.section = (i.SectionName !== undefined && i.SectionName !==null) ? ((i.SectionName.toString().trim() !== '') ? i.SectionName : '-') : '-',
          this.bloodGroup = (i.BloodGroupName !== undefined && i.BloodGroupName !==null) ? ((i.BloodGroupName.toString().trim() !== '') ? i.BloodGroupName : '-') : '-',
          this.rollNo = (i.ID !== undefined && i.ID !== null) ? ((i.ID.toString().trim() !== '') ? i.ID : '-') : '-',
          this.dob = (i.DateofBirth !== undefined && i.DateofBirth !== null) ? ((i.DateofBirth.toString().trim() !== '') ? i.DateofBirth : '-') : '-',
          this.doj = (i.DateofJoining !== undefined && i.DateofJoining !== null) ? ((i.DateofJoining.toString().trim() !== '') ? i.DateofJoining : '-') : '-',
          this.fatherContact = (i.FatherMobileNo !== undefined && i.FatherMobileNo !== null) ? ((i.FatherMobileNo.toString().trim() !== '') ? i.FatherMobileNo : '-') : '-',
          this.motherContact = (i.MotherMobileNo !== undefined && i.MotherMobileNo !== null) ? ((i.MotherMobileNo.toString().trim() !== '') ? i.MotherMobileNo : '-') : '-',
          this.guardian = (i.GaurdianMobileNo !== undefined && i.GaurdianMobileNo !== null) ? ((i.GaurdianMobileNo.toString().trim() !== '') ? i.GaurdianMobileNo : '-') : '-',
          this.address = (i.CurrentAddress !== undefined && i.CurrentAddress !== null) ? ((i.CurrentAddress.toString().trim() !== '') ? i.CurrentAddress : '-') : '-',
          this.emailId = (i.EmailId !== undefined && i.EmailId !== null) ? ((i.EmailId.toString().trim() !== '') ? i.EmailId : '-') : '-';
          this.userImage = (i.StudentPhotoFileName !== undefined && i.StudentPhotoFileName !== null) ? (i.StudentPhotoFileName.trim() !== '' ? ('../../assets/layout/' + folderName +'/'+ i.StudentPhotoFileName) : '') : '';
        })
        this.responseData = response;
  }
});
}
onEdit(){
  this.router.navigate(['/personal-details']);
  this.userService.setResponse(this.responseData);
    }
  }

