import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  dob: any = new Date();
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
  regId: any;
  slno: any;
  imagePreview: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    this.schoolNameOptions = [
      { label: 'xyz', value: "S001" },
    ];
    this.lastSchoolNameOptions = [
      { label: 'zzzz', value: "S002" },
    ];
      this.genderOptions = [
      { label: 'Female', value: 'Female' },
      { label: 'Male', value: 'Male' },
      { label: 'Others', value: 'Others' },
    ];
    this.mediumOptions = [
      { label: 'Tamil', value: '1' },
      { label: 'English', value: '2' }
    ];
    this.cityOptions = [
      { label: 'Chennai', value: 'C003' },
      { label: 'Cuddalore', value: 'C004' },
      { label: 'Coimbatore', value: 'C005' }
    ];
    this.stateOptions = [
      { label: 'Tamilnadu', value: '1' },
    ];
    this.districtOptions = [
      { label: 'Cuddalore', value: 'D003' },
      { label: 'Coimbatore-North', value: 'D004' }
    ];
    this.nationalityOptions = [
      { label: 'Indian', value: 'Indian' },
    ];
    this.casteOptions = [
      { label: 'MBC', value: 'MBC' },
      { label: 'BC', value: 'BC' },
      { label: 'OC', value: 'OC' },
      { label: 'SC/ST', value: 'SC' },
    ];
    this.classOptions = [
      { label: 'I', value: '1' },
      { label: 'II', value: '2' },
      { label: 'III', value: '3' },
      { label: 'IV', value: '4' },
      { label: 'V', value: '5' },
      { label: 'VI', value: '6' },
      { label: 'VII', value: '7' },
      { label: 'VIII', value: '8' },
      { label: 'IX', value: '9' },
      { label: 'X', value: '10' },
      { label: 'XI', value: '11' },
      { label: 'XII', value: '12' },
    ];
    this.sectionOptions = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'E', value: 'E' },
    ];
    this.roleIdOptions = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ];
  }

  onCheckAddress(value) {
    if (value !== undefined && value !== null) {
      this.currentAddress = (value && this.permanentAddress !== undefined) ? this.permanentAddress : '';
    }
  }

  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
    // reader.readAsDataURL(selectedFile);
    // console.log('url', reader.readAsDataURL(selectedFile));
    var endpoint = '../../assets/layout';
    this.http.post(endpoint, selectedFile).subscribe(res => {

    })
  }

  onSubmit() {
    const params = {
      'ID': (this.regId !== undefined && this.regId !== null) ? this.regId : 0,
      'slno': (this.slno !== undefined && this.slno !== null) ? this.slno : 0,
      'FirstName': this.firstName,
      'LastName': this.lastName,
      'RoleId': this.roleId,
      'DateofBirth': this.dob,
      'DateofJoining': this.doj,
      'Gender': this.gender,
      'City': this.city,
      'State': this.state,
      'Nationality': this.nationality,
      'Class': this.class,
      'Section': this.section,
      'StudentPhotoFileName': '',
      'Caste': this.caste,
      'Addressinfo': this.currentAddress,
      'PermanentAddress': this.permanentAddress,
      'SchoolId': this.schoolName,
      'PhoneNumber': this.mobileNo,
      'EmailId': this.studentEmailId,
      'Nameoflastschool': this.lastSchoolName,
      'LastchoolTelephone': this.lastSchoolContactNo,
      'DistrictId': this.district,
      'Postalcode': this.pincode,

      'FatherName': this.fatherName,
      'FatherOccupation': this.fatherOccupation,
      'FatherMobileNo': this.fatherContactNo,
      'FatherEmailid': this.fatherEmailId,
      'FatherPhotoFileName': '',
      'MotherName': this.motherName,
      'MotherOccupation': this.motherOccupation,
      'MotherMobileNo': this.motherContactNo,
      'MotherEmailid': this.motherEmailId,
      'MotherPhotoFilName': '',
      'GaurdianName': this.guardianName,
      'GaurdianOccupation': this.guardianOccupation,
      'GaurdianEmailid': this.guardianEmailId,
      'GaurdianPhotoFileName': '',
    };
    this.restApiService.post(PathConstants.Registration_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }

}
