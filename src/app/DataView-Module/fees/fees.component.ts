import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';
import { ResponseMessage } from 'src/app/Common-Module/Message';

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
  
  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

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
    this.data = [];
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      this.data = res;
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    });
  
  }
}
