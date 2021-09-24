import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.css']
})
export class FeeFormComponent implements OnInit {
  dueDate: Date = new Date();
  receiptbook: string;
  feename: string;
  actualamount: string;
  paidamount: string;
  outstanding: string;
  paying: string;
  fine: string;
  data: any = []; 
  cols: any;
  MRowId=0;
  // feereceipt 
  receiptCols: any;
  receiptData: any = [];
  showReceipt: boolean;
  receiptYear: any;
  logged_user: User;
  receiptNo: any;
  schoolName: any;
  schoolAddress: any;
  schoolContact: number;
  studentName: string;
  parentName: string;
  date: number;
  admnNo: any;
  class: any;
  today: any;
  total: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.logged_user = this.authService.UserInfo;
    this.cols = [
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
    
    // this.generateReceipt(null)
    
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
      'duedate': this.dueDate, // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'ReceiptBook': this.receiptbook,
      'FeeName': this.feename,
      'ActualAmount': this.actualamount,
      'PaidAmount': this.paidamount,
      'OutstandingAmount': this.outstanding,
      'PayingAmount': this.paying,
      'FineAmount': this.fine,
      'Flag' : true
  
    };
    this.restApiService.post(PathConstants.Fee_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.generateReceipt(params);
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
      }
    });
  
  }
  clear() {
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
// feereceipt method
  generateReceipt(data) {
    console.log('data',data);
    this.showReceipt = true;
    this.studentName = this.logged_user.username;
    this.class = this.logged_user.class + ' - ' + this.logged_user.section;
    this.parentName = this.logged_user.fathername;
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.total = data.PaidAmount,
    this.receiptData.push({
      'feeparticulars': data.FeeName,
      'totalamount': data.ActualAmount,
      'paidamount' : data.PaidAmount
    })
    
  }
  

  onPrint() {
// window.print();
  }

}
