import { Component, OnInit, ViewChild } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-holidaydetails-form',
  templateUrl: './holidaydetails-form.component.html',
  styleUrls: ['./holidaydetails-form.component.css']
})
export class HolidaydetailsFormComponent implements OnInit {

  selectedType: string;
  Holiday: any;
  HolidayOption: SelectItem[]
  typeOptions: SelectItem[];
  Events: string;
  date: any = new Date();
  Day: string;
  Status: string;
  data: any = []; 
  cols: any;
  MRowid=0;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _HolidayDetailsForm: NgForm;
  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService) { }

  ngOnInit(): void {
    this.HolidayOption = [
      { label: '-select-', value: null },
      { label: 'Leave', value: '0'},
      { label: 'Holiday', value: '1'},
    ];
    this.cols = [
      { field: 'SlNo', header: 'Slno'},
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
    this.blockUI.start();
    const params = {    
      'RowId': this.MRowid,
      'SchoolId': 1,
      'EventDetailS':this.Events,
      'Holiday': this.Holiday.value,     
      'eventdate': this.datepipe.transform(this.date,'MM/dd/yyyy'), 
      'Flag': 1,      
    };
    this.restApiService.post(PathConstants.Holiday_Post, params).subscribe(res => {
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
    this.restApiService.getByParameters(PathConstants.Holiday_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      let sno = 0;
      this.data.forEach(s => {
        sno += 1;
        s.SlNo = sno;
      });
      }
    });
 
  }
  clear() {
    this._HolidayDetailsForm.reset();
    this._HolidayDetailsForm.form.markAsUntouched();
    this._HolidayDetailsForm.form.markAsPristine();
    this.Events=""

  }
  onRowSelect(event, selectedRow)  {
    this.MRowid=selectedRow.RowId;
    this.HolidayOption= [{ label: selectedRow.Holiday, value: selectedRow.Holiday }];
    this.Events=selectedRow.EventDetailS;
    this.date=selectedRow.eventdate;
  }
}


