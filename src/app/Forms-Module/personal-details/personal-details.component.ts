import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
 
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  name: string;
  class: any;
  section: any;
  dob: any;
  doj: any;
  bloodGroup: any;
  guardianName: string;
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  fatherBloodGroup: any;
  motherBloodGroup: any;
  fatherContact: number;
  motherContact: number;
  address: any;
  yearRange: string;
  motherEmail: any;
  fatherEmail: any;
  guardianEmail: any;
  guardianOccupation: any;
  guardianBloodGroup: any;
  guardianContact: any;
 

  constructor(private restApiService: RestAPIService,  private messageService: MessageService, private http: HttpClient) { }

  ngOnInit()  {
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
  }

  onFileUpload($event){

  }

  onSave() {
    const params = {
      'FirstName' : this.name,
      'Class': this.class,
      'Section': this.section,
      'DateofBirth': this.dob,
      'DateofJoining': this.doj,
      'BloodGroup' : this.bloodGroup,
      'Addressinfo' : this.address,

      'FatherName': this.fatherName,
      'FatherOccupation': this.fatherOccupation,
      'FatherMobileNo': this.fatherContact,
      'FatherEmailid': this.fatherEmail,
      'MotherName': this.motherName,
      'MotherOccupation': this.motherOccupation,
      'MotherMobileNo': this.motherContact,
      'MotherEmailid': this.motherEmail,
      'GaurdianName': this.guardianName,
      'GaurdianOccupation': this.guardianOccupation,
      'GaurdianEmailid': this.guardianEmail,
      'GaurdianMobileNo': this.guardianContact,

    };
//     this.restApiService.post(PathConstants.Registration_Post, params).subscribe(response => {
//       if (response) {
//         // this.blockScreen = false;
//         this.messageService.clear();
//         this.messageService.add({
//           key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
//           summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
//         });
//       } else {
//         // this.blockScreen = false;
//         this.messageService.clear();
//         this.messageService.add({
//           key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
//           summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
//         });
//       }
//     }, (err: HttpErrorResponse) => {
//       // this.blockScreen = false;
//       if (err.status === 0 || err.status === 400) {
//         this.messageService.clear();
//         this.messageService.add({
//           key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
//           summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
//         })
//       }
    
//   });
console.log(params);
this.restApiService.post(PathConstants.Registration_Post, params).subscribe(res => {
  console.log('rs', res);
 
});
}
} 

  
    


  
