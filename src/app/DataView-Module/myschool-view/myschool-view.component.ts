import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-myschool-view',
  templateUrl: './myschool-view.component.html',
  styleUrls: ['./myschool-view.component.css']
})
export class MyschoolViewComponent implements OnInit {
  curriculum:  any;
  headMasterName: string;
  email: any;
  address: any;
  pincode: number;
  phoneNo: number;
  landlineNo: number;
  faxNo: any;

  constructor(private restApiService: RestAPIService) { }

  ngOnInit(): void {

    const params = {
     'SchoolID'  : 2,
    };
    this.restApiService.getByParameters(PathConstants.MySchool_Get, params).subscribe(response => {
      // console.log('response', response);
      if(response !== undefined && response !== null) {
        response.forEach(i => {
          this.curriculum = i.Curriculum,
          this.headMasterName = (i.HMName !== undefined && i.HMName !== null) ? ((i.HMName.toString().trim() !== '') ? i.HMName : '-') : '-',
          this.email = (i.Emailid	 !== undefined && i.Emailid	 !== null) ? ((i.Emailid	.toString().trim() !== '') ? i.Emailid	 : '-') : '-',
          this.address = (i.Addressinfo	 !== undefined && i.Addressinfo	 !== null) ? ((i.Addressinfo	.toString().trim() !== '') ? i.Addressinfo	 : '-') : '-',
          this.pincode = (i.Pincode	 !== undefined && i.Pincode	 !== null) ? ((i.Pincode	.toString().trim() !== '') ? i.Pincode	 : '-') : '-',
          this.phoneNo = (i.Phone	 !== undefined && i.Phone	 !== null) ? ((i.Phone	.toString().trim() !== '') ? i.Phone	 : '-') : '-',
          this.landlineNo = (i.Landline	 !== undefined && i.Landline	 !== null) ? ((i.Landline	.toString().trim() !== '') ? i.Landline	 : '-') : '-',
          this.faxNo = (i.Fax	 !== undefined && i.Fax	 !== null) ? ((i.Fax	.toString().trim() !== '') ? i.Fax	 : '-') : '-'
      })
      }
    });
  }

}
