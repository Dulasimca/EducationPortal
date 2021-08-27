import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  firstName: string;
  lastName: string;
  roleId: any;
  dob: any;
  selectedGender: string;
  genderOptions: SelectItem[];
  district: string;
  schoolName: string;
  mobileNo: number;
  altMobileNo: number;
  currentAddress: string;
  permanentAddress: string;
  class: string;
  section: string;
  lastSchoolName: string;
  lastSchoolContactNo: string;
  studentEmailId: string;
  selectedMedium: string;
  mediumOptions: SelectItem[];
  pincode: number;
  city: string;
  nationality: string;
  caste: string;
  checked: boolean;
  bloodGroup: string;
  yearRange: string;
  fatherName: string;
  fatherOccupation: string;
  fatherBloodGroup: string;
  fatherContactNo: number;
  fatherEmailId: string;
  motherName: string;
  motherOccupation: string;
  motherBloodGroup: string;
  motherContactNo: number;
  motherEmailId: string;
  guardianName: string;
  guardianOccupation: string;
  guardianBloodGroup: string;
  guardianContactNo: number;
  guardianEmailId: string;
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit() {
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    this.genderOptions = [
      { label: 'Female', value: 'F'},
      { label: 'Male', value: 'M'},
      { label: 'Others', value: 'O'},
    ];
    this.mediumOptions = [
      { label: 'Tamil', value: 'T' },
      { label: 'English', value: 'E' }
    ];
  }

  onCheckAddress(value) {
    if(value !== undefined && value !== null) {
      this.currentAddress = (value && this.permanentAddress !== undefined) ? this.permanentAddress : '';
    }
  }

  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
