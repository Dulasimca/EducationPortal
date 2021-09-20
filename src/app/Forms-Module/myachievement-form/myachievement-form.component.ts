import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';


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
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService) { }

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
      'eventdate': this.datepipe.transform(this.date, 'yyyy-MM-dd') ,    
      'EventDetailS':this.Events,
      'Place': this.Place,  
      'AchievementStatus':this.Status,
      'Flag': 1, 

    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.clear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.blockUI.stop(); 
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
        } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
        }
        }, (err: HttpErrorResponse) => {
        this.blockUI.stop();
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
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
