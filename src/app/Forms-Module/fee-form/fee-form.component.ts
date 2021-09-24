import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.css']
})
export class FeeFormComponent implements OnInit {
  dueDate: Date = new Date();
  receiptbook: any;
  feename: any;
  actualamount: any;
  paidamount: any;
  outstanding: any;
  paying: any;
  fine: any;
  data: any = []; 
  cols: any;
  MRowId=0;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _FeeForm: NgForm;
 

  constructor(private restApiService: RestAPIService, private http: HttpClient,private messageService: MessageService,private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'SlNo', header: 'Slno'},
      { field: 'RowId', header: 'ID' },
      { field: 'duedate', header: 'Due Date' },
      { field: 'ReceiptBook', header: 'Receipt Book' },
      { field: 'FeeName', header: 'Fee Name' },
      { field: 'ActualAmount', header: 'Actual Amount' },
      { field: 'PaidAmount', header: 'Paid Amount' },
      { field: 'OutstandingAmount', header: 'Outstanding Amount' },
      { field: 'PayingAmount', header: 'Paying Amount' },
      { field: 'FineAmount', header: 'Fine' }
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
      'RowId': this.MRowId,
      'Academic':0,
      'SchoolID': 1,
      'StudentId':1,      
      'Class': 1,     
      'duedate': this.datepipe.transform(this.dueDate, 'MM/dd/yyyy') ,
      'ReceiptBook': this.receiptbook,
      'FeeName': this.feename,
      'ActualAmount': this.actualamount,
      'PaidAmount': this.paidamount,
      'OutstandingAmount': this.outstanding,
      'PayingAmount': this.paying,
      'FineAmount': this.fine,
      'Flag' : true
  
    };
    console.log(params);
    this.restApiService.post(PathConstants.Fee_Post, params).subscribe(res => {
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
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
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
    this._FeeForm.reset();
    this._FeeForm.form.markAsUntouched();
    this._FeeForm.form.markAsPristine();
    this.receiptbook="",
    this.feename="",
    this.actualamount="",
    this.paidamount="",
    this.outstanding="",
    this.paying="",
    this.fine=""

  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.dueDate=selectedRow.duedate;
    this.receiptbook=selectedRow.ReceiptBook;
    this.feename=selectedRow.FeeName;
    this.actualamount=selectedRow.ActualAmount;
    this.paidamount=selectedRow.PaidAmount;
    this.outstanding=selectedRow.OutstandingAmount;
    this.paying=selectedRow.PayingAmount;
    this.fine=selectedRow.FineAmount;
  }

}
