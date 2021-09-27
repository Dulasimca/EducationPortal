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
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

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
  mobileNo: any;
  altMobileNo: any;
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
  pincode: any;
  city: string;
  cityOptions: SelectItem[];
  nationalityOptions: SelectItem[];
  nationality: string;
  caste: string;
  casteOptions: SelectItem[];
  checked: boolean;
  religionOptions: SelectItem[];
  religion: string;
  bloodGroupOptions: SelectItem[];
  bloodGroup: string;
  yearRange: string;
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: any;
  fatherEmailId: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: any;
  motherEmailId: string;
  guardianName: string;
  guardianOccupation: string;
  guardianContactNo: any;
  guardianEmailId: string;
  uploadedFiles: any[] = [];
  regId: any;
  slno: any;
  tabTitleI: string;
  tabTitleII: string;
  myFile: File;
  showSImg: boolean;
  s_URL: string;
  sImgProgress: Number = 0;
  showFImg: boolean;
  f_URL: string;
  fImgProgress: Number = 0;
  showMImg: boolean;
  m_URL: string;
  mImgProgress: Number = 0;
  showGImg: boolean;
  g_URL: string;
  gImgProgress: Number = 0;
  //masters
  districts?: any;
  sections?: any;
  classes?: any;
  roles?: any;
  castes?: any;
  genders?: any;
  mediums?: any;
  cities?: any;
  bloodGroups?: any;
  religions?: any;
  nationalities?: any;
  login_user: User;
  @ViewChild('f', { static: false }) _registrationForm: NgForm;
  @ViewChild('studentImg', { static: false }) studentImg: ElementRef;
  @ViewChild('fatherImg', { static: false }) fatherImg: ElementRef;
  @ViewChild('motherImg', { static: false }) motherImg: ElementRef;
  @ViewChild('guardianImg', { static: false }) guardianImg: ElementRef;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,
    private messageService: MessageService, private masterService: MasterService,
    public _d: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    ///loading master data
    this.login_user = this.authService.UserInfo;
   
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    this.roles = this.masterService.getMaster('R');
    this.castes = this.masterService.getMaster('CS');
    this.genders = this.masterService.getMaster('G');
    this.mediums = this.masterService.getMaster('M');
    this.bloodGroups = this.masterService.getMaster('B');
    this.religions = this.masterService.getMaster('RL');
    this.nationalities = this.masterService.getMaster('N');
    console.log('master', this.bloodGroups, this.districts);
        ///end
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    this.state = 'Tamilnadu';
    this.nationality = 'Indian';
    this.cityOptions = [{ label: this.login_user.taluk, value: this.login_user.talukId }];
    this.districtOptions = [{ label: this.login_user.district, value: this.login_user.distrctId }];
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
        if(this.roleIdOptions === undefined) {
        this.roles.forEach(r => {
          if(r.code === 6 || r.code === 5) {
          roleIdSelection.push({ label: r.name, value: r.code })
          }
        });
        this.roleIdOptions = roleIdSelection;
        this.roleIdOptions.unshift({ label: '-select', value: null });
      }
        break;
      case 'CS':
        this.casteOptions = this.castes;
        break;
      case 'G':
        this.genderOptions = this.genders;
        break;
      case 'B':
        this.bloodGroupOptions = this.bloodGroups;
        break;
      case 'RL':
        this.religionOptions = this.religions;
        break;
      case 'T':
        this.cityOptions = this.cities;
        break;
        case 'N':
          this.nationalityOptions = this.nationalities;
          break;
    }
  }

  onCheckAddress(value) {
    if (value !== undefined && value !== null) {
      this.currentAddress = (value && this.permanentAddress !== undefined) ? this.permanentAddress : '';
    }
  }

  onChangeRole() {
    if(this.roleId === 6) {
      this.tabTitleI = 'Student Info I';
      this.tabTitleII = 'Student Info II';
    } else {
      this.tabTitleI = 'Teacher Info I';
      this.tabTitleII = 'Teacher Info II';
    }
  }

  onFileUpload($event, id) {
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    const file = $event.srcElement.files[0];
    switch (id) {
      case 1:
        this.s_URL = window.URL.createObjectURL(file);
        this.showSImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        break;
      case 2:
        this.f_URL = window.URL.createObjectURL(file);
        this.showFImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        break;
      case 3:
        this.m_URL = window.URL.createObjectURL(file);
        this.showMImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        break;
      case 4:
        this.g_URL = window.URL.createObjectURL(file);
        this.showGImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        break;
    }
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
      Religion: this.religion,
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
      if (res !== undefined && res !== null) {
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
    this.state = 'Tamilnadu';
    this.nationality = 'Indian';
    this.cityOptions = [{ label: this.login_user.taluk, value: this.login_user.talukId }];
  }
}
