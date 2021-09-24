import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';
import { Profile } from 'src/app/Interfaces/profile';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, of } from 'rxjs';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import { PrimeNGConfig } from "primeng/api";


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {
  data: any = []; 
  cols: any;
  positionOptions: SelectItem[];
  selectedPosition: any;
  MRowid= 0;
  position: string;


  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private restApiService: RestAPIService, private http: HttpClient,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit() { 
    this.positionOptions = [
      { label: '-select-', value: null },
      { label: 'Class Representative', value: '0'},
      { label: 'School Representative', value: '1'},
    ];

    this.cols = [
      { field: 'RowId', header: 'ID' },
      { field: 'NomineeID', header: 'NomineeID' },
      { field: 'FirstName', header: 'Nominee Name'}
      
    ];
    }
  onView() {
    const params = {
      'SchoolID': 1,
      'ElectionID':this.selectedPosition.value,
    }
    this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });

  }
  onVotinglist() {
    const params = {
      'SchoolID': 1,  
      'StudentID': 1, 
      'NomineeID': 1,
      'ElectionID':1,
      'VoteStatus':1,
      'Flag' : true
    };
    console.log(params);
    this.restApiService.post(PathConstants.PollList_Post, params).subscribe(res1 => {
      if(res1 !== undefined && res1 !== null) {
        if (res1) {
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
      clear(){

      } 
      confirm1() {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
          },
          reject: (type) => {
              switch(type) {
                  case ConfirmEventType.REJECT:
                      this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                  break;
                  case ConfirmEventType.CANCEL:
                      this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                  break;
              }
          }
      });
      }
    
  }
