import { Component, OnInit } from '@angular/core';

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
  





  
  constructor() { }

  ngOnInit() { }

}
