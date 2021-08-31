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
  roleId: string;
  roleIdOptions: SelectItem[];
  dob: any  = new Date();
  doj: Date = new Date();
  gender: string;
  genderOptions: SelectItem[];
  district: string;
  districtOptions: SelectItem[];
  schoolName: string;
  schoolNameOptions: SelectItem[];
  mobileNo: number;
  altMobileNo: number;
  currentAddress: string;
  permanentAddress: string;
  class: string;
  classOptions: SelectItem[];
  section: string;
  sectionOptions: SelectItem[];
  lastSchoolName: string;
  lastSchoolNameOptions: SelectItem[];
  lastSchoolContactNo: string;
  studentEmailId: string;
  medium: string;
  mediumOptions: SelectItem[];
  state: string;
  stateOptions: SelectItem[];
  pincode: number;
  city: string;
  cityOptions: SelectItem[];
  nationality: string;
  nationalityOptions: SelectItem[];
  caste: string;
  casteOptions: SelectItem[];
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
    this.casteOptions = [
      { label: 'MBC', value: 'MBC' },
      { label: 'BC', value: 'BC' },
      { label: 'OC', value: 'OC' },
      { label: 'SC/ST', value: 'SC' },
    ]
  }

  onCheckAddress(value) {
    if(value !== undefined && value !== null) {
      this.currentAddress = (value && this.permanentAddress !== undefined) ? this.permanentAddress : '';
    }
  }

  onFileUpload($event, id) { }

  onSubmit() { }

}
