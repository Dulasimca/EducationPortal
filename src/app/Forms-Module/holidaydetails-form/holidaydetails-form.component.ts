import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';



@Component({
  selector: 'app-holidaydetails-form',
  templateUrl: './holidaydetails-form.component.html',
  styleUrls: ['./holidaydetails-form.component.css']
})
export class HolidaydetailsFormComponent implements OnInit {

  selectedType: string;
  typeOptions: SelectItem[];
  Events: string;
  date: Date = new Date();
  Day: string;
  Status: string;
 

  


  constructor() { }

  ngOnInit(): void {
    this.typeOptions = [
      { label: 'Leave', value: 'L'},
      { label: 'Holidays', value: 'H'},
    ];
  }
 

 
  }


