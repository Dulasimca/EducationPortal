import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';
import { Profile } from 'src/app/Interfaces/profile';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  firstName: string;
  lastName: string;
  roleId: any;
  roleIdOptions: SelectItem[];
  dob: any = new Date();
  doj: Date = new Date();
  gender: string;
  genderOptions: SelectItem[];
  district: any;
  districtOptions: SelectItem[];
  school: any;
  schoolOptions: SelectItem[];
  mobileNo: number;
  altMobileNo: number;
  currentAddress: string;
  permanentAddress: string;
  class: any;
  classOptions: SelectItem[];
  section: any;
  sectionOptions: SelectItem[];
  lastSchoolName: string;
  lastSchoolNameOptions: SelectItem[];
  lastSchoolContactNo: string;
  studentEmailId: string;
  medium: string;
  mediumOptions: SelectItem[];
  state: any;
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
  fatherContactNo: number;
  fatherEmailId: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: number;
  motherEmailId: string;
  guardianName: string;
  guardianOccupation: string;
  guardianContactNo: number;
  guardianEmailId: string;
  uploadedFiles: any[] = [];
  regId: any;
  slno: any;
  imagePreview: any;
  //masters
  districts?: any;
  sections?: any;
  classes?: any;
  roles?: any;
  @ViewChild('f', { static: false }) _registrationForm: NgForm;
  @ViewChild('studentImg', { static: false }) studentImg: ElementRef;
  @ViewChild('fatherImg', { static: false }) fatherImg: ElementRef;
  @ViewChild('motherImg', { static: false }) motherImg: ElementRef;
  @ViewChild('guardianImg', { static: false }) guardianImg: ElementRef;
  files = [];
  myFile:File;
  s_URL: string;
  sImgProgress: Number = 0;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,
    private messageService: MessageService, private masterService: MasterService,
    public _d: DomSanitizer) { }

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
    this.schoolOptions = [
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
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    const file = $event.srcElement.files[0];
    this.s_URL = window.URL.createObjectURL(file);
}

  onSubmit() {
    this.blockUI.start();
    const params: Profile = {
      ID: (this.regId !== undefined && this.regId !== null) ? this.regId : 0,
      slno: (this.slno !== undefined && this.slno !== null) ? this.slno : 0,
      FirstName: this.firstName,
      LastName: this.lastName,
      RoleId: this.roleId,
      DateofBirth: this.datePipe.transform(this.dob, 'yyyy-MM-dd'),
      DateofJoining: this.datePipe.transform(this.doj, 'yyyy-MM-dd'),
      Gender: this.gender,
      BloodGroup: this.bloodGroup,
      City: this.city,
      State: this.state,
      Nationality: this.nationality,
      Class: this.class.label,
      ClassId: this.class.value,
      Section: this.section.label,
      SectionId: this.section.value,
      StudentPhotoFileName: '',
      Caste: this.caste,
      Addressinfo: this.currentAddress,
      PermanentAddress: this.permanentAddress,
      SchoolName: this.school.label,
      SchoolId: this.school.value,
      PhoneNumber: this.mobileNo,
      AltNumber: this.altMobileNo,
      Medium: this.medium,
      UserId: 0,
      Flag: 1,
      EmailId: this.studentEmailId,
      Nameoflastschool: this.lastSchoolName,
      LastchoolTelephone: this.lastSchoolContactNo,
      District: this.district.label,
      DistrictId: this.district.value,
      Postalcode: this.pincode,
      Password: '123',
      FatherName: this.fatherName,
      FatherOccupation: this.fatherOccupation,
      FatherMobileNo: this.fatherContactNo,
      FatherEmailid: this.fatherEmailId,
      FatherPhotoFileName: '',
      MotherName: this.motherName,
      MotherOccupation: this.motherOccupation,
      MotherMobileNo: this.motherContactNo,
      MotherEmailid: this.motherEmailId,
      MotherPhotoFilName: '',
      GaurdianName: this.guardianName,
      GaurdianOccupation: this.guardianOccupation,
      GaurdianEmailid: this.guardianEmailId,
      GaurdianMobileNo: this.guardianContactNo,
      GaurdianPhotoFileName: '',
    };
    this.restApiService.post(PathConstants.Registration_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
      if (res.item1) {
        this.blockUI.stop();
        this.clearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
      } else {
        this.blockUI.stop();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    } else {
      this.messageService.clear();
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
        summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
      });
    }
    }, (err: HttpErrorResponse) => {
      this.blockUI.stop();
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }

  clearForm() {
    this._registrationForm.reset();
    this._registrationForm.form.markAsUntouched();
    this._registrationForm.form.markAsPristine();
    this.studentImg.nativeElement.value = null;
    this.fatherImg.nativeElement.value = null;
    this.motherImg.nativeElement.value = null;
    this.guardianImg.nativeElement.value = null;
  }
}
