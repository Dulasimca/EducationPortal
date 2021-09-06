import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name : string;
  class : any;
  rollNo : any;
  dob : any;
  doj : any;
  fatherContact : number;
  motherContact : number;
  guardian : any;
  bloodGroup : any;
  address : any;
  photo : any;
  
  constructor(private authService: AuthService) { }

  ngOnInit() { 
    const user: User = this.authService.getUserInfo();
    console.log('user', user);
  }

}
