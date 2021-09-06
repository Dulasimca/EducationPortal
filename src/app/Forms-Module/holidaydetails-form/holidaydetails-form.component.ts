import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';



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
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.typeOptions = [
      { label: 'Leave', value: 'L'},
      { label: 'Holidays', value: 'H'},
    ];
  }
 
  onSubmit() {
    const params = {    
      'RowId': 0,
      'SchoolId': 1,
      'EventDetailS':this.Events,
      'Holiday': 1,     
      'eventdate': this.date, 
      'Flag': 1,      
    };
    this.restApiService.post(PathConstants.Holiday_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }
 
  }


