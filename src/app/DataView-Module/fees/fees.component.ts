import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  year: SelectItem[];
  receiptData: any = [];
  paymentData: any = [];
  data: any = []; 
  cols: any;
  
  constructor(private restApiService: RestAPIService, private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      // { field: 'RowId', header: 'ID' },
      { field: 'duedate', header: 'Due Date' },
      { field: 'ReceiptBook', header: 'Receipt Book' },
      { field: 'FeeName', header: 'Fee Name' },
      { field: 'ActualAmount', header: 'Actual Amount' },
      { field: 'PaidAmount', header: 'Paid Amount' },
      { field: 'OutstandingAmount', header: 'Outstanding Amount' },
      { field: 'PayingAmount', header: 'Paying Amount' },
      { field: 'FineAmount', header: 'Fine' }
    ];
    this.onView()
    this.year = [ {label: '2021-2022', value: '12' }, { label: '2020-2021', value: '01'}];
    // this.receiptData = [
    //   { 'slno': 1, 'date': '02-01-2021', 'receipt': 'Tution Fee', 'feename': '1st Term Tution Fee', 'a_ammt': '1200',
    // 'pd_amnt': '0', 'o_amnt': '1200', 'p_amnt': '1200', 'fine': '0'},
    // { 'slno': 2, 'date': '10-04-2021', 'receipt': 'Tution Fee', 'feename': '2nd Term Tution Fee', 'a_ammt': '1110',
    // 'pd_amnt': '0', 'o_amnt': '1110', 'p_amnt': '1110', 'fine': '0'},
    // { 'slno': 3, 'date': '12-07-2021', 'receipt': 'Tution Fee', 'feename': '3rd Term Tution Fee', 'a_ammt': '995',
    // 'pd_amnt': '0', 'o_amnt': '995', 'p_amnt': '995', 'fine': '0'},
    // { 'slno': 4, 'date': '21-10-2021', 'receipt': 'Tution Fee', 'feename': '4th Term Tution Fee', 'a_ammt': '800',
    // 'pd_amnt': '0', 'o_amnt': '800', 'p_amnt': '800', 'fine': '0'},
    // ];
    // this.paymentData = [
    //   { 'slno': 1, 'date': '02-01-2021', 'method' : 'Online' , 'amount' : '1000' , 'number' : 'ER-2021-22-372'},
    //   { 'slno': 2, 'date': '21-03-2021', 'method' : 'Online' , 'amount' : '1800' , 'number' : 'TF-2021-28-367'},
    //   { 'slno': 3, 'date': '15-05-2021', 'method' : 'Online' , 'amount' : '2500' , 'number' : 'TF-2021-72-379'},

    // ];
  }
  onDownload() {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8';
    const path = "../../assets/files/Invoice.pdf";
    const filename = 'Invoice_Pdf' + ".pdf";
    saveAs(path, filename);
  },
  reject: (type) => { }
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
}
