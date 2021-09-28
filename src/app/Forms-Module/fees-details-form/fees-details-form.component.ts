import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
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
  logged_user: User;
  studentName: string;
  class: any;
  parentName: any;
  schoolName: string;
  schoolAddress: any;
  today: any;
  total: any;
  feeData: any = [];
  receiptData: any = [];
  yearOptions: any;
  constructor(private restApiService: RestAPIService, private authService: AuthService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.yearOptions = [
      { label: '2019-2020', value: '2019-2020' },
      { label: '2020-2021', value: '2020-2021' },
      { label: '2021-2022', value: '2021-2022' },
      { label: '2022-2023', value: '2021-2022' },

    ];
    this.login_user = this.authService.UserInfo;
    this.cols = [
      { field: 'CreatedDate', header: 'Pay Date'},
      { field: '', header: 'Pay Method' },
      { field: 'PaidAmount', header: 'Paid Amount' }
    ];
    this.onLoad()
  }
  onLoad() {
    const params = {
      'SchoolID':this.login_user.schoolId
       
    }
    this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
  
  }



    
//       this.data = res;
//       this.onDownload(params);
//       // this.feeData.push({
//       //   'paidamount': this.data.Actua
//       // })

//       // this.data = res;
//       let sno = 0;
//       this.data.forEach(s => {
//         sno += 1;
//         s.SlNo = sno;
//       });
//       }
//     });
    
    
//   this.login_user = this.authService.UserInfo;

  
         
    
        
//   // onSave() { }

// }
onDownload(data) {
}
//   this.showReceipt = true;
//   this.schoolName = this.logged_user.schoolname;
//   this.schoolAddress = this.logged_user.taluk + '-' + this.logged_user.pincode;
//   this.studentName = this.logged_user.username;
//   this.class = this.logged_user.class + ' - ' + this.logged_user.section;
//   this.parentName = this.logged_user.fathername;
//   this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
//   this.total = data.PaidAmount,
//   this.receiptData.push({
//     'feeparticulars': data.FeeName,
//     'totalamount': data.ActualAmount,
//     'paidamount' : data.PaidAmount
//   })
  
  }
    
