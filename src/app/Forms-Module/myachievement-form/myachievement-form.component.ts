import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-myachievement-form',
  templateUrl: './myachievement-form.component.html',
  styleUrls: ['./myachievement-form.component.css']
})
export class MyachievementFormComponent implements OnInit {

  date: Date = new Date();
  Status: any;
  Place : any;
  Events: any;
  data: any = []; 
  cols: any;
  MRowId=0;

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'RowId', header: 'ID' },
      { field: 'eventdate', header: 'Date' },
      { field: 'EventDetailS', header: 'Events' },
      { field: 'Place', header: 'Place' },
      { field: 'AchievementStatus', header: 'Status' }  
  ];
   

  }
  onSubmit() {
    const params = {    
      'RowId': this.MRowId,
      'SchoolId': 1,         
      'StudentId':1,
      'eventdate': this.date,    
      'EventDetailS':this.Events,
      'Place': this.Place,  
      'AchievementStatus':this.Status,
      'Flag': 1, 

    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }
  onView() {
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Myachievement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
  
  }
  clear() {

    this.Events="",
    this.Place="",
    this.Status=""
    
  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.date=selectedRow.eventdate;
    this.Events=selectedRow.EventDetailS;
    this.Place=selectedRow.Place;
    this.Status=selectedRow.AchievementStatus;
  }
}
