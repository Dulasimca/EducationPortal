import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';


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
  login_user: User;
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private restApiService: RestAPIService, private messageService: MessageService
    ,private authService: AuthService) { }

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
    this.login_user = this.authService.UserInfo;
    }
  onView() {
    const params = {
      'SchoolID': this.login_user.schoolId,
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
      'SchoolID': this.login_user.schoolId,  
      'StudentID': this.login_user.id, 
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
     
    
  }
