import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';


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
 

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
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
    console.log(params);
    this.restApiService.post(PathConstants.Fee_Post, params).subscribe(res => {
      console.log('rs', res);
     
    });
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

}
