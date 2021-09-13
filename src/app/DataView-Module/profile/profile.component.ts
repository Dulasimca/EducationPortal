import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  fatherContact: number;
  motherContact: number;
  guardian: any;
  bloodGroup: any;
  address: any;
  photo: any;
  responseData: Profile;
  
  constructor(private authService: AuthService, private restApiService: RestAPIService, private router: Router, private userService: UserService) { }

  ngOnInit() { 
    const user: User = this.authService.UserInfo;
    console.log('user', user);
    const params = { 'Value': user.email, 'Type': '2' };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if(response !== undefined && response !== null && response.length !== 0) {
        this.responseData = response;
        response.forEach(i => {
          this.name = (i.FirstName !== undefined && i.FirstName !== null) ? ((i.FirstName.toString().trim() !== '') ? i.FirstName : '-') : '-',
          this.class = (i.Class !== undefined && i.Class !== null) ? ((i.Class.toString().trim() !== '') ? i.Class : '-') : '-',
          this.section = (i.Section !== undefined && i.Section !==null) ? ((i.Section.toString().trim() !== '') ? i.Section : '-') : '-',
          this.bloodGroup = (i.BloodGroup !== undefined && i.BloodGroup !==null) ? ((i.BloodGroup.toString().trim() !== '') ? i.BloodGroup : '-') : '-',
          this.rollNo = (i.ID !== undefined && i.ID !== null) ? ((i.ID.toString().trim() !== '') ? i.ID : '-') : '-',
          this.dob = (i.DateofBirth !== undefined && i.DateofBirth !== null) ? ((i.DateofBirth.toString().trim() !== '') ? i.DateofBirth : '-') : '-',
          this.doj = (i.DateofJoining !== undefined && i.DateofJoining !== null) ? ((i.DateofJoining.toString().trim() !== '') ? i.DateofJoining : '-') : '-',
          this.fatherContact = (i.FatherMobileNo !== undefined && i.FatherMobileNo !== null) ? ((i.FatherMobileNo.toString().trim() !== '') ? i.FatherMobileNo : '-') : '-',
          this.motherContact = (i.MotherMobileNo !== undefined && i.MotherMobileNo !== null) ? ((i.MotherMobileNo.toString().trim() !== '') ? i.MotherMobileNo : '-') : '-',
          this.guardian = (i.GaurdianMobileNo !== undefined && i.GaurdianMobileNo !== null) ? ((i.GaurdianMobileNo.toString().trim() !== '') ? i.GaurdianMobileNo : '-') : '-',
          this.address = (i.Addressinfo !== undefined && i.Addressinfo !== null) ? ((i.Addressinfo.toString().trim() !== '') ? i.Addressinfo : '-') : '-'
        })
  }
});
}
onEdit(){
  this.router.navigate(['/personal-details']);
  this.userService.setResponse(this.responseData);
    }
  }

