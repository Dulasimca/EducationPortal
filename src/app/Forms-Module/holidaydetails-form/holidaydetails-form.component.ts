import { Component, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';
import { TableConstants } from 'src/app/Common-Module/TableConstants';




@Component({
  selector: 'app-holidaydetails-form',
  templateUrl: './holidaydetails-form.component.html',
  styleUrls: ['./holidaydetails-form.component.css']
})
export class HolidaydetailsFormComponent implements OnInit {

  selectedType: string;
  Holiday: number;
  HolidayOption: SelectItem[]
  typeOptions: SelectItem[];
  Events: string;
  date: any = new Date();
  Day: string;
  Status: string;
  data: any = [];
  cols: any;
  MRowid = 0;
  login_user: User;
  holidays?: any;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _HolidayDetailsForm: NgForm;
  loading: boolean;
  showTable: boolean;
  constructor(private restApiService: RestAPIService, private http: HttpClient, private datepipe: DatePipe, private messageService: MessageService
    , private authService: AuthService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.masterService.getMaster('');
    this.cols = TableConstants.HolidayDetailsColumns;
    this.login_user = this.authService.UserInfo;
  }

  onSubmit() {
    this.blockUI.start();
    const params = {
      'RowId': this.MRowid,
      'SchoolId': this.login_user.schoolId,
      'EventDetailS': this.Events,
      'Holiday': this.Holiday,
      'eventdate': this.datepipe.transform(this.date, 'MM/dd/yyyy'),
      'Flag': 1,
    };
    this.restApiService.post(PathConstants.Holiday_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
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
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NetworkErrorMessage
        })
      }
    })
  }

  onView() {
    this.data = [];
    this.showTable = true;
    this.loading = true;
    const params = {
      'SchoolID': this.login_user.schoolId,
    }
    this.restApiService.getByParameters(PathConstants.Holiday_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        if (res.length !== 0) {
          res.forEach(r => {
            r.hdate = this.datepipe.transform(r.eventdate, "dd/MM/yyyy");
          })

          this.data = res;
          this.loading = false;
        } else {
          this.loading = false;
          this.showTable = true;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      }
    });
  }

  onSelect(type) {
    this.holidays = this.masterService.getMaster('HT');
    let holidaySelection = [];
    switch (type) {
      case 'HT':
        this.holidays.forEach(c => {
          holidaySelection.push({ label: c.name, value: c.code })
        });
        this.HolidayOption = holidaySelection;
        this.HolidayOption.unshift({ label: '-select', value: null });
        break;
    }
  }

  delete(row) {
    this.blockUI.start();
    this.restApiService.put(PathConstants.Holiday_Put, { 'RowId': row.RowId }).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          this.onView();
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.DeleteSuccessMsg
          })
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
          })
        }
      } else {
        this.blockUI.stop();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
        })
      }
    }, (err: HttpErrorResponse) => {
      this.blockUI.stop();
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NetworkErrorMessage
        })
      }
    })
  }

  clear() {
    this._HolidayDetailsForm.reset();
    this._HolidayDetailsForm.form.markAsUntouched();
    this._HolidayDetailsForm.form.markAsPristine();
    this.Events = ""
    this.data = [];
    this.Holiday = null;
    this.HolidayOption = [];
    this.date = new Date();
  }
  
  onEdit(selectedRow) {
    this.MRowid = selectedRow.RowId;
    this.Holiday = selectedRow.HolidayId;
    this.HolidayOption = [{ label: selectedRow.HolidayName, value: selectedRow.HolidayId }];
    this.Events = selectedRow.EventDetailS;
    this.date = new Date(selectedRow.eventdate);
  }
}


