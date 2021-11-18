import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {
  data: any = [];
  cols: any;
  positionOptions: SelectItem[];
  selectedPosition: number;
  MRowid = 0;
  position: string;
  login_user: User;
  isDataAvailable: boolean;
  isActive: boolean;
  loading: boolean;
  showVoteStatus: boolean;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private messageService: MessageService, private authService: AuthService
    , private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.positionOptions = [
      { label: '-select-', value: null },
      { label: 'Class Representative', value: 2 },
      { label: 'School Representative', value: 1 },
    ];
    this.cols = TableConstants.PollListColumns;
    this.login_user = this.authService.UserInfo;
    this.showVoteStatus = false;
  }

  onView() {
    this.showVoteStatus = false;
    this.loading = true;
    this.data = [];
    let nomineeList = [];
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ElectionID': this.selectedPosition,
      'StudentID': this.login_user.id
    }
    var votedList = [];
    this.restApiService.getByParameters(PathConstants.PollList_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.isDataAvailable = true;
        this.loading = false;
        votedList = res.slice(0);
      } else {
        this.isDataAvailable = false;
        this.loading = false;
        votedList = [];
      }
    this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
      this.loading = true;
      if (res !== null && res !== undefined && res.length !== 0) {
        res.forEach(i => {
          if (votedList.length !== 0) {
            votedList.forEach(j => {
              if (j.NomineeID === i.NomineeID) {
                this.showVoteStatus = true;
                nomineeList.push({
                  'isVoted': 'true',
                  'RowId': i.RowId,
                  'SchoolID': i.SchoolID,
                  'ElectionID': i.ElectionID,
                  'NomineeID': i.NomineeID,
                  'FirstName': i.FirstName,
                  'Class': i.ClassName + ' - ' + i.SectionName
                })
              } else {
                nomineeList.push({
                  'isVoted': 'false',
                  'RowId': i.RowId,
                  'SchoolID': i.SchoolID,
                  'ElectionID': i.ElectionID,
                  'NomineeID': i.NomineeID,
                  'FirstName': i.FirstName,
                  'Class': i.ClassName + ' - ' + i.SectionName
                })
              }
            });
          } else {
            this.showVoteStatus = false;
            nomineeList.push({
              'isVoted': 'false',
              'RowId': i.RowId,
              'SchoolID': i.SchoolID,
              'ElectionID': i.ElectionID,
              'NomineeID': i.NomineeID,
              'FirstName': i.FirstName,
              'Class': i.ClassName + ' - ' + i.SectionName
            })
          }
        });
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    });
  });
    this.data = nomineeList;
  }

  onVotinglist(selectedRow) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.submit(selectedRow);
        this.onView();
      },
      reject: (type) => {
        console.log('rejected!');
      }
    });
  }

  submit(data) {
    this.blockUI.start();
    const params = {
      'SchoolID': this.login_user.schoolId,
      'StudentID': this.login_user.id,
      'NomineeID': data.NomineeID,
      'ElectionID': this.selectedPosition,
      'ClassId': this.login_user.classId,
      'VoteStatus': 1,
      'Flag': true
    };
    this.restApiService.post(PathConstants.PollList_Post, params).subscribe(res1 => {
      if (res1 !== undefined && res1 !== null) {
        if (res1) {
          this.blockUI.stop();
          this.onView();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.VotingSuccessMsg
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
}
