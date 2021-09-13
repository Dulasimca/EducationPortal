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
  date: any = new Date();
  Day: string;
  Status: string;
  data: any = []; 
  cols: any;
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.typeOptions = [
      { label: 'Leave', value: '0'},
      { label: 'Holidays', value: '1'},
    ];
    this.cols = [
      { field: 'Holiday', header: 'Type' },
      { field: 'EventDetailS', header: 'Events' },
      { field: 'eventdate', header: 'Date' }     
    ];
  }

  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
  }
 
  onSubmit() {
    const params = {    
      'RowId': 0,
      'SchoolId': 1,
      'EventDetailS':this.Events,
      'Holiday': this.selectedType,     
      'eventdate': this.date, 
      'Flag': 1,      
    };
    this.restApiService.post(PathConstants.Holiday_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }
  onView() {
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Holiday_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
 
  }
  clear() {
    this.Events=""

  }
}


