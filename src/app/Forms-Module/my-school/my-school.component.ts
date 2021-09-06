import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent implements OnInit {

 
  curriculum:  SelectItem[];
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
      { label: 'Stateboard', value: '01' },
      { label: 'CBSE', value: '02' },
    ]
    
  }

}
