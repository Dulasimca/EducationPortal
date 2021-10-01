import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { Profile } from 'src/app/Interfaces/profile';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

name: string;
class: any;
section: any;
rollNo: any;
dob: any;
gender: any;
doj: any;
medium: any;
bloodGroup: any;
address: any;
fatherName: string;
fatherOccupation: any;
fatherEmail: any;
fatherContact: number;
motherName: string;
motherOccupation: any;
motherEmail: any;
motherContact: number;
image: any;
responseData: Profile;
activeIndex: any;
guardianName: string;
guardianOccupation: any;
guardianContact: number;
guardianEmailId: any;
roleId: any;

  constructor(private router: Router, private authService: AuthService, 
    private restApiService : RestAPIService, private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const user: User = this.authService.UserInfo;
    this.roleId = user.roleId;
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
       this.activeIndex = Number.parseInt(this.route.snapshot.queryParamMap.get('id'));
   console.log('param',this.route.snapshot.queryParamMap.get('id'), this.activeIndex)
    const params = { 'Value': user.email, 'Type': '2' };
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(response => {
      if(response !== undefined && response !== null && response.length !== 0) {
        this.responseData = response;
        response.forEach(i => {
          this.name = (i.FirstName !== undefined && i.FirstName !== null) ? ((i.FirstName.toString().trim() !== '') ? i.FirstName : '-') : '-',
          this.class = (i.Class !== undefined && i.Class !== null) ? ((i.Class.toString().trim() !== '') ? i.Class : '-') : '-',
          this.section = (i.Section !== undefined && i.Section !==null) ? ((i.Section.toString().trim() !== '') ? i.Section : '-') : '-',
          this.bloodGroup = (i.BloodGroup !== undefined && i.BloodGroup !==null) ? ((i.BloodGroup.toString().trim() !== '') ? i.BloodGroup : '-') : '-',
          this.gender = (i.Gender !== undefined && i.Gender !==null) ? ((i.Gender.toString().trim() !== '') ? i.Gender : '-') : '-',
          this.rollNo = (i.ID !== undefined && i.ID !== null) ? ((i.ID.toString().trim() !== '') ? i.ID : '-') : '-',
          this.dob = (i.DateofBirth !== undefined && i.DateofBirth !== null) ? ((i.DateofBirth.toString().trim() !== '') ? i.DateofBirth : '-') : '-',
          this.medium = (i.MediumName !== undefined && i.MediumName !==null) ? ((i.MediumName.toString().trim() !== '') ? i.MediumName : '-') : '-',
          this.doj = (i.DateofJoining !== undefined && i.DateofJoining !== null) ? ((i.DateofJoining.toString().trim() !== '') ? i.DateofJoining : '-') : '-',
          this.address = (i.Addressinfo !== undefined && i.Addressinfo !== null) ? ((i.Addressinfo.toString().trim() !== '') ? i.Addressinfo : '-') : '-'
          this.fatherName = (i.FatherName !== undefined && i.FatherName !== null) ? ((i.FatherName.toString().trim() !== '') ? i.FatherName : '-') : '-',
          this.fatherContact = (i.FatherMobileNo !== undefined && i.FatherMobileNo !== null) ? ((i.FatherMobileNo.toString().trim() !== '') ? i.FatherMobileNo : '-') : '-',
          this.fatherEmail = (i.FatherEmailid !== undefined && i.FatherEmailid !== null) ? ((i.FatherEmailid.toString().trim() !== '') ? i.FatherEmailid : '-') : '-',
          this.fatherOccupation = (i.FatherOccupation !== undefined && i.FatherOccupation !== null) ? ((i.FatherOccupation.toString().trim() !== '') ? i.FatherOccupation : '-') : '-',
          this.motherName = (i.MotherName !== undefined && i.MotherName !== null) ? ((i.MotherName.toString().trim() !== '') ? i.MotherName : '-') : '-',
          this.motherOccupation = (i.MotherOccupation !== undefined && i.MotherOccupation !== null) ? ((i.MotherOccupation.toString().trim() !== '') ? i.MotherOccupation : '-') : '-',
          this.motherContact = (i.MotherMobileNo !== undefined && i.MotherMobileNo !== null) ? ((i.MotherMobileNo.toString().trim() !== '') ? i.MotherMobileNo : '-') : '-',
          this.motherEmail = (i.MotherEmailid !== undefined && i.MotherEmailid !== null) ? ((i.MotherEmailid.toString().trim() !== '') ? i.MotherEmailid : '-') : '-',
          this.guardianName = (i.GaurdianName !== undefined && i.GaurdianName !== null) ? ((i.GaurdianName.toString().trim() !== '') ? i.GaurdianName : '-') : '-',
          this.guardianOccupation = (i.GaurdianOccupation !== undefined && i.GaurdianOccupation !== null) ? ((i.GaurdianOccupation.toString().trim() !== '') ? i.GaurdianOccupation : '-') : '-',
          this.guardianContact = (i.GaurdianMobileNo !== undefined && i.GaurdianMobileNo !== null) ? ((i.GaurdianMobileNo.toString().trim() !== '') ? i.GaurdianMobileNo : '-') : '-',
          this.guardianEmailId = (i.GaurdianEmailid !== undefined && i.GaurdianEmailid !== null) ? ((i.GaurdianEmailid.toString().trim() !== '') ? i.GaurdianEmailid : '-') : '-'
        })
      }
    });
  }
  onEdit(){
    this.router.navigate(['/personal-details']);
    this.userService.setResponse(this.responseData);
      }
    }
  


