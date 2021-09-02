import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  name: string;
  class: any;
  section: any;
  dob: any;
  doj: any;
  bloodGroup: any;
  guardianName: string;
  fathersName: string;
  mothersName: string;
  fathersOccupation: string;
  mothersOccupation: string;
  fathersBloodGroup: any;
  mothersBloodGroup: any;
  fathersContact: number;
  mothersContact: number;
  address: any;
  yearRange: string;
  mothersEmail: any;
  fathersEmail: any;
  guardiansEmail: any;

  constructor() { }

  ngOnInit()  {
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
  }

  onFileUpload($event){

  }
}
