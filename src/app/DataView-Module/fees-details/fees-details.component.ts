import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-fees-details',
  templateUrl: './fees-details.component.html',
  styleUrls: ['./fees-details.component.css']
})
export class FeesDetailsComponent implements OnInit { 
  totalAmount: any;
  selectedYear: number;
  paidAmount: any;
  academicYear:any;
  yearRange: string;
  paydate: any;
  paymethod: any;
  showReceipt: boolean;
  login_user :User;
  studentName: string;
  class: any;
  receiptNo: number;
  parentName: any;
  schoolName: any;
  schoolAddress: any;
  today: any;
  total: any;
  feeCols :any;
  feeData: any = [];
  receiptData: any = [];
  yearOptions: SelectItem[];
  years?: any;
  loading: boolean;
  showTable: boolean;
  constructor(private restApiService: RestAPIService, private authService: AuthService, 
    private masterService: MasterService, private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit(): void {
    this.years = this.masterService.getAccountingYear();
    this.login_user = this.authService.UserInfo;
    this.feeCols = TableConstants.FeesColumns;
    var data = [];
    if(this.years.length !== 0) {
      this.years.forEach(y => {
       data.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = data;
      this.selectedYear = data[0].value;
      this.onLoad()
    }
  }

  onSelect() {
    let yearSelection = [];
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });

    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
  }

  onLoad() {
    this.feeData = [];
    this.showTable = true;
    this.loading = true;
    const params = {
      'schoolID': this.login_user.schoolId,
      'studentID': this.login_user.id,
      'yearID': this.selectedYear !== null && this.selectedYear !== undefined ? this.selectedYear : 0,
      'type': 1
    }
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      console.log(res);
      if(res !== null && res !== undefined && res.length !== 0) {
        if(res) {
          this.loading = false;
          this.feeData = res;
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
    else {
      this.loading = false;
      this.messageService.clear();
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
        summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
      })
    }
    });
  
  }

  generateReceipt(data) {
  this.receiptData = []
  this.showReceipt = true;
  this.schoolName = this.login_user.schoolname;
  this.schoolAddress = this.login_user.taluk + '-' + this.login_user.pincode;
  this.studentName = this.login_user.username;
  this.receiptNo = data.RowId;
  this.class = this.login_user.classRoman + ' - ' + this.login_user.section;
  this.parentName = this.login_user.fathername;
  this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  this.total = data.PaidAmount,
  this.receiptData.push({
    'feeparticulars': data.FeeName,
    'paydate': data.CreatedDate,
    'totalamount': data.ActualAmount,
    'paidamount' : data.PaidAmount
  })
  
  }
}
