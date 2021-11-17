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
import { TableConstants } from 'src/app/Common-Module/TableConstants';

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
  showDialog: boolean;
  registeredData: any[] = [];
  registeredCols: any;
  studentImage: any;
  fatherImage: any;
  motherImage: any;
  guardianImage: any;
  header: string;
  maxDate: Date = new Date();
  roleId: number;
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
    this.registeredCols = TableConstants.RegisteredAssociateColumns;
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
          this.roleId = this.obj.RoleId;
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
      this.obj.CurrentAddress = (value && this.obj.PermanentAddress !== undefined) ? this.obj.PermanentAddress : '';
    }
  }

  onChangeRole() {
    const current_year = new Date().getFullYear();
    let start_year_range;
    if (this.obj.RoleId === 6) {
      this.tabTitleI = 'Student Info I';
      this.tabTitleII = 'Student Info II';
      start_year_range = current_year - 20;
    } else {
      this.tabTitleI = 'Teacher Info I';
      this.tabTitleII = 'Teacher Info II';
      start_year_range = current_year - 60;
    }
    this.yearRange = start_year_range + ':' + current_year;
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
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
        actualFilename = fileToUpload.name;
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
        this.studentImage = this._d.bypassSecurityTrustUrl(this.s_URL);
        this.showSImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.StudentPhotoFileName = this.uploadFile($event.target.files, this.sImgProgress);
        break;
      case 2:
        this.f_URL = window.URL.createObjectURL(file);
        this.fatherImage = this._d.bypassSecurityTrustUrl(this.f_URL);
        this.showFImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.FatherPhotoFileName = this.uploadFile($event.target.files, this.fImgProgress);
        break;
      case 3:
        this.m_URL = window.URL.createObjectURL(file);
        this.motherImage = this._d.bypassSecurityTrustUrl(this.m_URL);
        this.showMImg = (this.s_URL !== undefined && this.s_URL !== null) ? true : false;
        this.obj.MotherPhotoFilName = this.uploadFile($event.target.files, this.mImgProgress);
        break;
      case 4:
        this.g_URL = window.URL.createObjectURL(file);
        this.guardianImage = this._d.bypassSecurityTrustUrl(this.g_URL);
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

  onEdit(row) {
    this.showDialog = false;
    console.log('row', row)
    this.obj = row;
    this.obj.SchoolName = this.login_user.schoolname;
    this.obj.DateofBirth = new Date(row.DateofBirth),
      this.obj.DateofJoining = new Date(row.DateofJoining),
      this.obj.StudentPhotoFileName = (row.StudentPhotoFileName !== undefined && row.StudentPhotoFileName !== null) ?
        (row.StudentPhotoFileName.toString().trim() !== '' ? row.StudentPhotoFileName : '') : '',
      this.obj.FatherPhotoFileName = (row.FatherPhotoFileName !== undefined && row.FatherPhotoFileName !== null) ?
        (row.FatherPhotoFileName.toString().trim() !== '' ? row.FatherPhotoFileName : '') : '',
      this.obj.MotherPhotoFilName = (row.MotherPhotoFilName !== undefined && row.MotherPhotoFilName !== null) ?
        (row.MotherPhotoFilName.toString().trim() !== '' ? row.MotherPhotoFilName : '') : '',
      this.obj.GaurdianPhotoFileName = (row.GaurdianPhotoFileName !== undefined && row.GaurdianPhotoFileName !== null) ?
        (row.GaurdianPhotoFileName.toString().trim() !== '' ? row.GaurdianPhotoFileName : '') : '',
      this.obj.IncomeFilename = (row.IncomeFilename !== undefined && row.IncomeFilename !== null) ?
        (row.IncomeFilename.toString().trim() !== '' ? row.IncomeFilename : '') : '',
      this.obj.NativityFilename = (row.NativityFilename !== undefined && row.NativityFilename !== null) ?
        (row.NativityFilename.toString().trim() !== '' ? row.NativityFilename : '') : '',
      this.obj.CommunityFilename = (row.CommunityFilename !== undefined && row.CommunityFilename !== null) ?
        (row.CommunityFilename.toString().trim() !== '' ? row.CommunityFilename : '') : '',
      this.classOptions = [{ label: row.Classname2, value: row.ClassId }];
    this.sectionOptions = [{ label: row.SectionName, value: row.SectionId }];
    this.mediumOptions = [{ label: row.MediumName, value: row.Medium }];
    this.bloodGroupOptions = [{ label: row.BloodGroupName, value: row.BloodGroup }];
    this.genderOptions = [{ label: row.GenderName, value: row.Gender }];
    this.casteOptions = [{ label: row.CasteName, value: row.Caste }];
    this.motherTongueOptions = [{ label: row.MotherTongueName, value: row.MotherTongue }];
    this.religionOptions = [{ label: row.ReligionName, value: row.Religion }];
    this.nationalityOptions = [{ label: row.NationalityName, value: row.Nationality }];
    var folder = ((this.login_user.roleId * 1) === 6) ? FileUploadConstant.StudentRegistration :
      FileUploadConstant.TeacherRegistration;
    this.fatherImage = '../../assets/layout/' + folder + '/' + this.obj.FatherPhotoFileName;
    this.studentImage = '../../assets/layout/' + folder + '/' + this.obj.StudentPhotoFileName;
    this.motherImage = '../../assets/layout/' + folder + '/' + this.obj.MotherPhotoFilName;
    this.guardianImage = '../../assets/layout/' + folder + '/' + this.obj.GaurdianPhotoFileName;
  }

  onView() {
    this.registeredData = [];
    this.blockUI.start();
    this.header = ((this.obj.RoleId * 1) === 6) ? 'Registered Students' : 'Registered Teachers';
    const params = {
      'SchoolId': this.login_user.schoolId,
      'Value': this.login_user.id,
      'RoleId': this.obj.RoleId,
      'Type': "1"
    }
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res.length !== 0) {
          this.showDialog = true;
          res.forEach(x => {
            x.dob = this.datePipe.transform(x.DateofBirth, 'MM/dd/yyyy');
            x.doj = this.datePipe.transform(x.DateofJoining, 'MM/dd/yyyy');
          })
          this.registeredData = res;
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      } else {
        this.blockUI.stop();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }

  onSubmit() {
    this.blockUI.start();
    this.obj.DateofBirth = (typeof (this.obj.DateofBirth) === 'object') ?
      this.datePipe.transform(this.obj.DateofBirth, 'MM/dd/yyyy') : this.obj.DateofBirth;
    this.obj.DateofJoining = (typeof (this.obj.DateofJoining) === 'object') ?
      this.datePipe.transform(this.obj.DateofJoining, 'MM/dd/yyyy') : this.obj.DateofJoining;
    this.obj.UserId = this.login_user.id;
    this.obj.Disability = (this.obj.Disability !== undefined && this.obj.Disability !== null) ? this.obj.Disability.trim() : null,
      this.obj.Password = '123';
    this.obj.CurrentAddress = (this.obj.CurrentAddress !== undefined && this.obj.CurrentAddress !== null) ?
      this.obj.CurrentAddress : this.obj.PermanentAddress;
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
    this.obj.slno = 0;
    this.obj.ID = 0;
    this.obj.State = 'Tamilnadu';
    this.obj.SchoolId = this.login_user.schoolId;
    this.obj.SchoolName = this.login_user.schoolname;
    this.obj.Taluk = this.login_user.talukId;
    this.talukOptions = [{ label: this.login_user.taluk, value: this.login_user.talukId }];
    this.obj.DistrictId = this.login_user.distrctId;
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
    if (this.studentImg !== undefined) {
      this.studentImg.nativeElement.value = null;
    }    
    if(this.fatherImg !== undefined) {
    this.fatherImg.nativeElement.value = null;
    }
    if(this.motherImg !== undefined) {
    this.motherImg.nativeElement.value = null;
    }
    if(this.guardianImg !== undefined) {
      this.guardianImg.nativeElement.value = null;
    }
    if(this.incomeCertificate !== undefined) {
      this.incomeCertificate.nativeElement.value = null;
    }
    if (this.nativityCertificate !== undefined) {
      this.nativityCertificate.nativeElement.value = null;
    } 
    if(this.communityCertificate !== undefined) {
       this.communityCertificate.nativeElement.value = null;
    }
    this.isChecked = false;
    this.casteOptions = [];
    this.classOptions = [];
    this.genderOptions = [];
    this.mediumOptions = [];
    this.sectionOptions = [];
    this.motherTongueOptions = [];
    this.religionOptions = [];
    this.bloodGroupOptions = [];
    this.nationalityOptions = [];
    this.obj.RoleId = (this.roleId !== undefined && this.roleId !== null) ? this.roleId : null;
    this.setDefaultObject();
  }
}
