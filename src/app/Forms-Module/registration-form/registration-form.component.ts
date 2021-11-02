import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import { Profile } from 'src/app/Interfaces/profile';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  obj: Profile = {} as Profile;
  roleIdOptions: SelectItem[];
  genderOptions: SelectItem[];
  districtOptions: SelectItem[];
  classOptions: SelectItem[];
  sectionOptions: SelectItem[];
  mediumOptions: SelectItem[];
  talukOptions: SelectItem[];
  nationalityOptions: SelectItem[];
  motherTongueOptions: SelectItem[];
  casteOptions: SelectItem[];
  checked: boolean;
  religionOptions: SelectItem[];
  bloodGroupOptions: SelectItem[];
  yearRange: string;
  uploadedFiles: any[] = [];
  tabTitleI: string;
  tabTitleII: string;
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
  iImgProgress: Number = 0;
  cImgProgress: Number = 0;
  nImgProgress: Number = 0;
  isChecked: boolean = false;
  //masters
  districts?: any;
  sections?: any;
  classes?: any;
  roles?: any;
  castes?: any;
  genders?: any;
  mediums?: any;
  taluks?: any;
  bloodGroups?: any;
  religions?: any;
  nationalities?: any;
  languages?: any;
  login_user: User;
  @ViewChild('f', { static: false }) _registrationForm: NgForm;
  @ViewChild('studentImg', { static: false }) studentImg: ElementRef;
  @ViewChild('fatherImg', { static: false }) fatherImg: ElementRef;
  @ViewChild('motherImg', { static: false }) motherImg: ElementRef;
  @ViewChild('guardianImg', { static: false }) guardianImg: ElementRef;
  @ViewChild('incomeCertificate', { static: false }) incomeCertificate: ElementRef;
  @ViewChild('nativityCertificate', { static: false }) nativityCertificate: ElementRef;
  @ViewChild('communityCertificate', { static: false }) communityCertificate: ElementRef;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,
    private messageService: MessageService, private masterService: MasterService,
    public _d: DomSanitizer, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    ///loading master data
    this.login_user = this.authService.UserInfo;
    this.masterService.getMaster('');
    ///end
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    this.setDefaultObject();
  }

  onSelect(type) {
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    this.roles = this.masterService.getMaster('R');
    this.castes = this.masterService.getMaster('CS');
    this.genders = this.masterService.getMaster('G');
    this.mediums = this.masterService.getMaster('M');
    this.bloodGroups = this.masterService.getMaster('B');
    this.religions = this.masterService.getMaster('RL');
    this.nationalities = this.masterService.getMaster('N');
    this.languages = this.masterService.getMaster('MT');
    let classSelection = [];
    let sectionSelection = [];
    let roleIdSelection = [];
    let casteSelection = [];
    let mediumSelection = [];
    let religionSelection = [];
    let genderSelection = [];
    let bloodGroupSelection = [];
    let nationalitySelection = [];
    let languageSelection = [];
    switch (type) {
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
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
        if (this.roleIdOptions === undefined) {
          this.roles.forEach(r => {
            if (r.code === 6 || r.code === 5) {
              roleIdSelection.push({ label: r.name, value: r.code })
            }
          });
          this.roleIdOptions = roleIdSelection;
          this.roleIdOptions.unshift({ label: '-select', value: null });
        }
        break;
      case 'CS':
        this.castes.forEach(c => {
          casteSelection.push({ label: c.name, value: c.code });
        })
        this.casteOptions = casteSelection;
        this.casteOptions.unshift({ label: '-select-', value: null });
        break;
      case 'G':
        this.genders.forEach(g => {
          genderSelection.push({ label: g.name, value: g.code });
        })
        this.genderOptions = genderSelection;
        this.genderOptions.unshift({ label: '-select-', value: null });
        break;
      case 'B':
        this.bloodGroups.forEach(b => {
          bloodGroupSelection.push({ label: b.name, value: b.code });
        })
        this.bloodGroupOptions = bloodGroupSelection;
        this.bloodGroupOptions.unshift({ label: '-select-', value: null });
        break;
      case 'RL':
        this.religions.forEach(r => {
          religionSelection.push({ label: r.name, value: r.code });
        })
        this.religionOptions = religionSelection;
        this.religionOptions.unshift({ label: '-select-', value: null });
        break;
      case 'N':
        this.nationalities.forEach(n => {
          nationalitySelection.push({ label: n.name, value: n.code });
        })
        this.nationalityOptions = nationalitySelection;
        this.nationalityOptions.unshift({ label: '-select-', value: null });
        break;
      case 'M':
        this.mediums.forEach(m => {
          mediumSelection.push({ label: m.name, value: m.code });
        })
        this.mediumOptions = mediumSelection;
        this.mediumOptions.unshift({ label: '-select-', value: null });
        break;
      case 'MT':
        this.languages.forEach(l => {
          languageSelection.push({ label: l.name, value: l.code })
        });
        this.motherTongueOptions = languageSelection;
        this.motherTongueOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onCheckAddress(value) {
    if (value !== undefined && value !== null) {
      this.obj.CurrentAddrress = (value && this.obj.PermanentAddress !== undefined) ? this.obj.PermanentAddress : '';
    }
  }

  onChangeRole() {
    if (this.obj.RoleId === 6) {
      this.tabTitleI = 'Student Info I';
      this.tabTitleII = 'Student Info II';
    } else {
      this.tabTitleI = 'Teacher Info I';
      this.tabTitleII = 'Teacher Info II';
    }
  }

  public uploadFile = (files, progress) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    let actualFilename = '';
    const folderName = (this.obj.RoleId === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration
    const filename = fileToUpload.name + '^' + folderName;
    this.formData.append('file', fileToUpload, filename);
    actualFilename = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
      }
      );
    return actualFilename;
  }

  onFileUpload($event, id) {
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    const file = $event.srcElement.files[0];
    switch (id) {
      case 1:
        this.s_URL = window.URL.createObjectURL(file);
        this.showSImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.StudentPhotoFileName = this.uploadFile($event.target.files, this.sImgProgress);
        break;
      case 2:
        this.f_URL = window.URL.createObjectURL(file);
        this.showFImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.FatherPhotoFileName = this.uploadFile($event.target.files, this.fImgProgress);
        break;
      case 3:
        this.m_URL = window.URL.createObjectURL(file);
        this.showMImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.MotherPhotoFilName = this.uploadFile($event.target.files, this.mImgProgress);
        break;
      case 4:
        this.g_URL = window.URL.createObjectURL(file);
        this.showGImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.GaurdianPhotoFileName = this.uploadFile($event.target.files, this.gImgProgress);
        break;
      case 5:
        this.obj.IncomeFilename = this.uploadFile($event.target.files, this.iImgProgress);
        break;
      case 6:
        this.obj.CommunityFilename = this.uploadFile($event.target.files, this.cImgProgress);
        break;
      case 7:
        this.obj.NativityFilename = this.uploadFile($event.target.files, this.nImgProgress);
        break;

    }
  }

  onSubmit() {
    this.blockUI.start();
    this.obj.slno = 0;
    this.obj.ID = 0;
    this.obj.DateofBirth = this.datePipe.transform(this.obj.DateofBirth, 'yyyy-MM-dd');
    this.obj.DateofJoining = this.datePipe.transform(this.obj.DateofJoining, 'yyyy-MM-dd');
    this.obj.Disability = (this.obj.Disability !== undefined && this.obj.Disability !== null) ? this.obj.Disability.trim() : null,
    this.obj.Password = '123';
      console.log('obj', this.obj);
    this.restApiService.post(PathConstants.Registration_Post, this.obj).subscribe(res => {
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
        this.blockUI.stop();
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

  setDefaultObject() {
    this.obj = {} as Profile;
    this.obj.State = 'Tamilnadu';
    this.obj.SchoolId = this.login_user.schoolId;
    this.obj.Taluk = this.login_user.talukId;
    this.talukOptions = [{ label: this.login_user.taluk, value: this.login_user.talukId }];
    this.obj.District = this.login_user.distrctId;
    this.districtOptions = [{ label: this.login_user.district, value: this.login_user.distrctId }];
    this.obj.IncomeFilename = '';
    this.obj.MotherPhotoFilName = '';
    this.obj.FatherPhotoFileName = '';
    this.obj.StudentPhotoFileName = '';
    this.obj.GaurdianPhotoFileName = '';
    this.obj.NativityFilename = '';
    this.obj.CommunityFilename = '';
  }

  clearForm() {
    this._registrationForm.reset();
    this._registrationForm.form.markAsUntouched();
    this._registrationForm.form.markAsPristine();
    this.studentImg.nativeElement.value = null;
    this.fatherImg.nativeElement.value = null;
    this.motherImg.nativeElement.value = null;
    this.guardianImg.nativeElement.value = null;
    this.isChecked = false;
    this.setDefaultObject();
  }
}
