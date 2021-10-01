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
  MRowid = 0;
  position: string;
  login_user: User;
  isDataAvailable: boolean;
  isActive: boolean;
  @BlockUI() blockUI: NgBlockUI;
  loading: boolean;

  constructor(private restApiService: RestAPIService, private messageService: MessageService, private authService: AuthService
    , private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.positionOptions = [
      { label: '-select-', value: null },
      { label: 'Class Representative', value: '0' },
      { label: 'School Representative', value: '1' },
    ];

    this.cols = [
      // { field: 'RowId', header: 'ID' },
      { field: 'FirstName', header: 'Nominee Name' }

    ];
    this.login_user = this.authService.UserInfo;
  }

  onView() {
    this.loading = true;
    this.data = [];
    let nomineeList = [];
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ElectionID': this.selectedPosition.value,
      'StudentID': this.login_user.id
    }
    this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        console.log(res);
        res.forEach(i => {
          nomineeList.push({
            'isActive': false,
            'RowId': i.RowId,
            'SchoolID': i.SchoolID,
            'ElectionID': i.ElectionID,
            'NomineeID': i.NomineeID,
            'FirstName': i.FirstName
          })
        });
      }
    });
    this.restApiService.getByParameters(PathConstants.PollList_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.isDataAvailable = true;
        this.loading = false;
        console.log(res);
        res.forEach(i => {
          nomineeList.unshift({
            'isActive': true,
            'SchoolID': i.SchoolID,
            'StudentID': i.StudentID,
            'NomineeID': i.NomineeID,
            'ElectionID': i.ElectionID,
            'VoteStatus': i.VoteStatus,
            'FirstName': i.FirstName
          });
        })

      } else {
        this.isDataAvailable = false;
      }
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
    const params = {
      'SchoolID': this.login_user.schoolId,
      'StudentID': this.login_user.id,
      'NomineeID': data.NomineeID,
      'ElectionID': this.selectedPosition.value,
      'ClassId': this.login_user.classId,
      'VoteStatus': 1,
      'Flag': true
    };
    console.log(params);
    this.restApiService.post(PathConstants.PollList_Post, params).subscribe(res1 => {
      if (res1 !== undefined && res1 !== null) {
        if (res1) {
          this.blockUI.stop();
          this.onView();
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


}
