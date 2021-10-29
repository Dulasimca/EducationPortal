import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-fees-details-form',
  templateUrl: './fees-details-form.component.html',
  styleUrls: ['./fees-details-form.component.css']
})
export class FeesDetailsFormComponent implements OnInit {
  
  totalAmount: any;
  selectedYear: any;
  paidAmount: any;
  academicYear:any;
  yearRange: string;
  cols :any = [];
  data: any = [];
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
  feeData: any = [];
  receiptData: any = [];
  yearOptions: SelectItem[];
  years?: any;
  constructor(private restApiService: RestAPIService, private authService: AuthService, 
    private masterService: MasterService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.masterService.getAccountingYear();
       this.login_user = this.authService.UserInfo;
    this.cols = [
      {field: 'FeeName', header: 'Fee Name'},
      { field: 'CreatedDate', header: 'Pay Date'},
      { field: 'PayMethod', header: 'Pay Method' },
      { field: 'PaidAmount', header: 'Paid Amount' }
    ];
  }

  onSelect() {
    this.years = this.masterService.getAccountingYear();
    let yearSelection = [];
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });

    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
    console.log('rs',this.yearOptions)
  }

  onLoad() {
    const params = {
      'schoolID': this.login_user.schoolId,
      'studentID': this.login_user.id,
      'yearID': this.selectedYear.value,
      'type': 1
    }

    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
        if(res) {
      console.log( res);
      this.feeData = res;
      }
    }
    });
  
  }

onDownload(data) {
  
  this.showReceipt = true;
  this.schoolName = this.login_user.schoolname;
  this.schoolAddress = this.login_user.taluk + '-' + this.login_user.pincode;
  this.studentName = this.login_user.username;
  this.receiptNo = data.RowId;
  this.class = this.login_user.class + ' - ' + this.login_user.section;
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
