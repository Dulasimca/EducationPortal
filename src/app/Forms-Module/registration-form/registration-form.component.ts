import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';

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
  state: any = 1;
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
  blockScreen: boolean;
  //masters
  districts?: any;
  sections?: any;
  classes?: any;
  roles?: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private messageService: MessageService, private masterService: MasterService) { }

  ngOnInit() {
    ///loading master data
    this.districts = this.masterService.getMaster('D');
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    this.roles = this.masterService.getMaster('R');
    ///end
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    this.schoolNameOptions = [
      { label: '-select-', value: null },
      { label: 'xyz', value: 1 },
      { label: 'tdt', value: 2 },
    ];
    this.lastSchoolNameOptions = [
      { label: '-select-', value: null },
      { label: 'zzzz', value: "S002" },
      { label: 'tyyyy', value: "S003" },
    ];
    this.genderOptions = [
      { label: '-select-', value: null },
      { label: 'Female', value: 'Female' },
      { label: 'Male', value: 'Male' },
      { label: 'Others', value: 'Others' },
    ];
    this.mediumOptions = [
      { label: '-select-', value: null },
      { label: 'Tamil', value: '1' },
      { label: 'English', value: '2' }
    ];
    this.cityOptions = [
      { label: '-select-', value: null },
      { label: 'Chennai', value: 'C003' },
      { label: 'Cuddalore', value: 'C004' },
      { label: 'Coimbatore', value: 'C005' }
    ];
    this.stateOptions = [
       { label: '-select-', value: null },
      { label: 'Tamilnadu', value: 1 },
    ];
    this.nationalityOptions = [
       { label: '-select-', value: null },
      { label: 'Indian', value: 'Indian' },
    ];
    this.casteOptions = [
      { label: '-select-', value: null },
      { label: 'MBC', value: 'MBC' },
      { label: 'BC', value: 'BC' },
      { label: 'OC', value: 'OC' },
      { label: 'SC/ST', value: 'SC' },
    ];
  }

  onSelect(type) {
    let districtSelection = [];
    let classSelection = [];
    let sectionSelection = [];
    let roleIdSelection = [];
    switch (type) {
      case 'D':
        this.districts.forEach(d => {
          districtSelection.push({ label: d.name, value: d.code });
        })
        this.districtOptions = districtSelection;
        this.districtOptions.unshift({ label: '-select', value: null });
        break;
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        let sortedClass = _.sortBy(classSelection, 'value');
        this.classOptions = sortedClass;
        this.classOptions.unshift({ label: '-select', value: null });
        break;
      case 'S':
        this.sections.forEach(s => {
          sectionSelection.push({ label: s.name, value: s.code })
        });
        this.sectionOptions = sectionSelection;
        this.sectionOptions.unshift({ label: '-select', value: null });
        break;
      case 'R':
        this.roles.forEach(r => {
          roleIdSelection.push({ label: r.name, value: r.code })
        });
        this.roleIdOptions = roleIdSelection;
        this.roleIdOptions.unshift({ label: '-select', value: null });
        break;
    }
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
  }

  onSubmit() {
    this.blockScreen = true;
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
      'Password': '123',

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
      'GaurdianMobileNo': this.guardianContactNo,
      'GaurdianPhotoFileName': '',
    };
    this.restApiService.post(PathConstants.Registration_Post, params).subscribe(res => {
      if (res.item1) {
        this.blockScreen = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
      } else {
        this.blockScreen = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      this.blockScreen = false;
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }
}
