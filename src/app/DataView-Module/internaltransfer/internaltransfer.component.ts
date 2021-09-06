import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-internaltransfer',
  templateUrl: './internaltransfer.component.html',
  styleUrls: ['./internaltransfer.component.css']
})
export class InternaltransferComponent implements OnInit {
  date: Date = new Date();
  district : SelectItem[];
  school : SelectItem[];
  display: boolean = false;
  selectedDistrict: any;
  selectedSchool: any;
  
  constructor() { }

  ngOnInit() {
    this.district = [ 
      
    ]

    this.school = [
     
    ]
  }

  onTransfer() {
          this.display = true;
  }
}
