import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent implements OnInit {

 
  curriculum: any = []
  headMasterName: string;
  email: any;
  address: any;
  pincode: number;
  phoneNo: number;
  landlineNo: number;
  faxNo: any;
  selectedCurriculum: any;




  constructor() { }

  ngOnInit(): void {

    this.curriculum = [
      {name : 'Stateboard'},
      {name : 'CBSE'},
    ]
    
  }

}
