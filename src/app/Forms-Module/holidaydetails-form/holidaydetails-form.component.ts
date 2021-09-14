import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';



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
  MRowid=0;
  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.typeOptions = [
      { label: '-select-', value: null },
      { label: 'Leave', value: '0'},
      { label: 'Holidays', value: '1'},
    ];
    this.cols = [
      { field: 'RowId', header: 'ID' },
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
      'RowId': this.MRowid,
      'SchoolId': 1,
      'EventDetailS':this.Events,
      'Holiday': this.selectedType,     
      'eventdate': this.datepipe.transform(this.date,'yyyy-MM-dd'), 
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
  onRowSelect(event, selectedRow)  {
    this.MRowid=selectedRow.RowId;
    this.selectedType=selectedRow.Holiday;
    this.Events=selectedRow.EventDetailS;
    this.date=selectedRow.eventdate;
  }
}


