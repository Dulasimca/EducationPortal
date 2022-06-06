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
  schoolOptions: SelectItem[];
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
  schoolNames? : any;
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
  adminroleIdCheck: number;
  dob: Date;
  doj: Date;
  schoolList: any = [];
  aadharNo: string;
  
  aadharValidationMsg: string;
  isEditable:boolean;
  
  isEditableschooldropdown :boolean;
  //isMandate:boolean;
 

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
  schoolId: any;
  // data: any;

  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,
    private messageService: MessageService, private masterService: MasterService,
    private _messageService: MessageService,private _restApiService: RestAPIService,
    public _d: DomSanitizer, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    ///loading master data
    this.login_user = this.authService.UserInfo;
    this.adminroleIdCheck = this.login_user.roleId;
    this.masterService.getMaster('');
    ///end
    this.registeredCols = TableConstants.RegisteredAssociateColumns;
    this.setDefaultObject();

     // Login According to roleId //
     
    if( this.login_user.roleId === 1 ) {
      this.isEditable = true;
      
      // Passing null value according to role
      
      this.obj.ClassId = null;        
      this.obj.SectionId = null;
      this.doj = null;
      this.obj.EmailId = null;
     }
     else{
       this.isEditable = false;
     }
  if ( this.login_user.roleId === 3 ){
    this.isEditableschooldropdown = true;
  
    //this.isMandate = true;
    this.obj.SchoolNameDp = null;
  }
  else
       this.isEditableschooldropdown =false;
       
     this.restApiService.get(PathConstants.SchoolNameMaster_Get).subscribe(res => {
       res.Table.forEach(r => {
         r.SchoolCode = this.schoolId;
       })
      this.schoolNames = res.Table;
    });
  }

  onDateSelection(type) {
    if (type === 'B') {
      this.obj.DateofBirth = this.dob;
    } else {
      this.obj.DateofJoining = this.doj;
    }
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
     this.districts = this.masterService.getMaster('D');
     let districtSelection = [];
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
    let schoolSelection = [];
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
          if(this.adminroleIdCheck===1 || this.adminroleIdCheck===2)
          {
            this.roles.forEach(r => {
              if (r.code === 3) {
                roleIdSelection.push({ label: r.name, value: r.code })
              }
            });
          }
          else 
          {
          this.roles.forEach(r => {
            if (r.code === 6 || r.code === 5) {
              roleIdSelection.push({ label: r.name, value: r.code })
            }
          });
        }
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
    case 'SN':
      this.schoolNames.forEach(l => {
        schoolSelection.push({ label: l.Schoolname, value: l.Schoolcode })
      });
      this.schoolOptions = schoolSelection;
      this.schoolOptions.unshift({ label: '-select', value: null });
      break;
  }
  }

  onCheckAddress(value) {
    if (value !== undefined && value !== null) {
      this.obj.CurrentAddress = (value && this.obj.PermanentAddress !== undefined) ? this.obj.PermanentAddress : '';
    }
  }

  onChangeRole() {
    if (this._registrationForm !== undefined) {
      this.clearForm();
    }
    const current_year = new Date().getFullYear();
    let start_year_range;
    if (this.roleId === 6) {
      this.tabTitleI = 'Student Info I';
      this.tabTitleII = 'Student Info II';
      start_year_range = current_year - 20;
    } else if(this.roleId === 5) {
      this.tabTitleI = 'Teacher Info I';
      this.tabTitleII = 'Teacher Info II';
      start_year_range = current_year - 60;
    }
    else{
      this.tabTitleI = 'Information I';
      this.tabTitleII = 'Information II';
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
    const folderName = (this.roleId === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration
    const filename = fileToUpload.name + '^' + folderName;
    this.formData.append('file', fileToUpload, filename);
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
        actualFilename = fileToUpload.name;
      }
      );
    actualFilename = fileToUpload.name;
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
    var data: Profile = row;
    this.obj = data as Profile;
    console.log('dt', data, row, this.obj)
    this.obj['State'] = 'Tamilnadu';
    this.obj['SchoolName'] = this.login_user.schoolname;
    this._registrationForm.form.controls['_state'].patchValue(this.obj.State);
    this._registrationForm.form.controls['_schlname'].patchValue(this.obj.SchoolName);
    this.dob = new Date(row.DateofBirth);
    this.doj = new Date(row.DateofJoining);
    this.obj.DateofBirth = new Date(row.DateofBirth);
    this.obj.DateofJoining = new Date(row.DateofJoining);
    this.obj.StudentPhotoFileName = (row.StudentPhotoFileName !== undefined && row.StudentPhotoFileName !== null) ?
      (row.StudentPhotoFileName.toString().trim() !== '' ? row.StudentPhotoFileName : '') : '';
    this.obj.FatherPhotoFileName = (row.FatherPhotoFileName !== undefined && row.FatherPhotoFileName !== null) ?
      (row.FatherPhotoFileName.toString().trim() !== '' ? row.FatherPhotoFileName : '') : '';
    this.obj.MotherPhotoFilName = (row.MotherPhotoFilName !== undefined && row.MotherPhotoFilName !== null) ?
      (row.MotherPhotoFilName.toString().trim() !== '' ? row.MotherPhotoFilName : '') : '';
    this.obj.GaurdianPhotoFileName = (row.GaurdianPhotoFileName !== undefined && row.GaurdianPhotoFileName !== null) ?
      (row.GaurdianPhotoFileName.toString().trim() !== '' ? row.GaurdianPhotoFileName : '') : '';
    this.obj.IncomeFilename = (row.IncomeFilename !== undefined && row.IncomeFilename !== null) ?
      (row.IncomeFilename.toString().trim() !== '' ? row.IncomeFilename : '') : '';
    this.obj.NativityFilename = (row.NativityFilename !== undefined && row.NativityFilename !== null) ?
      (row.NativityFilename.toString().trim() !== '' ? row.NativityFilename : '') : '';
    this.obj.CommunityFilename = (row.CommunityFilename !== undefined && row.CommunityFilename !== null) ?
      (row.CommunityFilename.toString().trim() !== '' ? row.CommunityFilename : '') : '';
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
    this.header = ((this.roleId * 1) === 6) ? 'Registered Students' : ((this.roleId * 1) === 5) ?'Registered Teachers':"Registered Admin";
    const params = {
      'SchoolId': this.login_user.schoolId,
      'Value': this.login_user.id,
      'RoleId': this.roleId,
      'Type': "1"
    }
    this.restApiService.getByParameters(PathConstants.Registration_Get, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res.length !== 0) {
          this.showDialog = true;
          res.forEach(x => {
            x.dob = this.datePipe.transform(x.DateofBirth, 'dd/MM/yyyy');
            x.doj = this.datePipe.transform(x.DateofJoining, 'dd/MM/yyyy');
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
    for (var i in this.obj) {
      if (this.obj[i] === null || this.obj[i] === undefined) {
        this.obj[i] = '';
      }
    }

    this.obj.SchoolName = this.obj.SchoolName;
    this.obj.SchoolId = this.obj.SchoolName;
    this.obj.RoleId = (this.roleId !== undefined && this.roleId !== null) ? this.roleId : 0;
    this.obj.DateofBirth = (typeof (this.obj.DateofBirth) === 'object') ?
      this.datePipe.transform(this.obj.DateofBirth, 'MM/dd/yyyy') : this.obj.DateofBirth;
    this.obj.DateofJoining = (typeof (this.obj.DateofJoining) === 'object') ?
      this.datePipe.transform(this.obj.DateofJoining, 'MM/dd/yyyy') : this.obj.DateofJoining;
    this.obj.UserId = this.login_user.id;
    this.obj.Disability = (this.obj.Disability !== undefined && this.obj.Disability !== null) ? this.obj.Disability.trim() : '';
    this.obj.Password = '123';
    this.obj.CurrentAddress = (this.obj.CurrentAddress !== undefined && this.obj.CurrentAddress !== null) ?
      this.obj.CurrentAddress : this.obj.PermanentAddress;
    var statusMsg = (this.obj.slno !== 0) ? ResponseMessage.UpdateSucess : ResponseMessage.SuccessMessage;
    delete this.obj['dob'];
    delete this.obj['doj'];
    this.restApiService.post(PathConstants.Registration_Post, this.obj).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res.item1) {
          this.blockUI.stop();
          this.clearForm();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: statusMsg
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
    this.obj['State'] = 'Tamilnadu';
    this.obj['SchoolName'] = this.login_user.schoolname;
    
    this.obj.SchoolId = this.obj.SchoolId;
    // this.schoolOptions =[{label: this.obj.SchoolName, value: this.obj.SchoolId}]
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

  maskInput(value) {
    this.obj.aadharNo = value;
    var len = value.length;
    if (len > 11) {
      this.aadharNo = '*'.repeat(len - 4) + value.substr(8, 4);
    }
  }

  validateAadhaar(aadhaarString) {
    // The multiplication table
    if (aadhaarString.length != 12) {
      this.aadharValidationMsg = 'Aadhaar numbers should be 12 digits !';
    } else {
      this.aadharValidationMsg = '';
    }
    if (aadhaarString.match(/[^$,.\d]/)) {
      this.aadharValidationMsg = 'Aadhaar numbers must contain only numbers !';
    } else {
      this.aadharValidationMsg = '';
    }
    var aadhaarArray = aadhaarString.split('');
    var toCheckChecksum = aadhaarArray.pop();
    if (this.generate(aadhaarArray) == toCheckChecksum) {
      this.aadharValidationMsg = '';
      this.maskInput(aadhaarString)
      return true;
    } else {
      this.aadharValidationMsg = 'Invalid Aadhar No!';
      this._registrationForm.form.controls._aadharno.invalid;
      if (this.aadharNo.length === 12) {
        setTimeout(() => {
          this.aadharNo = null;
          this.aadharValidationMsg = 'Please enter valid Aadhar No!';
    }, 300);
      }
      return false;
    }
  }

  // generates checksum
  generate(array) {
    var d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    // permutation table p
    var p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
    // inverse table inv
    var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
    var c = 0;
    var invertedArray = array.reverse();
    for (var i = 0; i < invertedArray.length; i++) {
      c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
    }
    return inv[c];
  }

  checkAadhar() {
    const params = {
      'AadharNo': this.obj.aadharNo,
      //'studentId': this.obj.studentId
    }
    this._restApiService.getByParameters(PathConstants.AadharCheck_Get, params).subscribe(res => {
      if ( res.Table.length === 0) { 
        this.onSubmit();
      } else {
        this._messageService.clear();
        this._messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: 'Aadhar number is already exist'
        })
      }
    });
  }
  clearForm() {
    this._registrationForm.reset();
    this._registrationForm.form.markAsUntouched();
    this._registrationForm.form.markAsPristine();
    this.showFImg = false;
    this.showGImg = false;
    this.showMImg = false;
    this.showSImg = false;
    if (this.studentImg.nativeElement.files.length !== 0) {
      this.studentImg.nativeElement.value = null;
    }
    if (this.fatherImg !== undefined && this.motherImg !== undefined && this.guardianImg !== undefined &&
      this.nativityCertificate !== undefined && this.communityCertificate !== undefined &&
      this.incomeCertificate !== undefined) {
      if (this.fatherImg.nativeElement.files.length !== 0) {
        this.fatherImg.nativeElement.value = null;
      }
      if (this.motherImg.nativeElement.files.length !== 0) {
        this.motherImg.nativeElement.value = null;
      }
      if (this.guardianImg.nativeElement.files.length !== 0) {
        this.guardianImg.nativeElement.value = null;
      }
      if (this.incomeCertificate.nativeElement.files.length !== 0) {
        this.incomeCertificate.nativeElement.value = null;
      }
      if (this.nativityCertificate.nativeElement.files.length !== 0) {
        this.nativityCertificate.nativeElement.value = null;
      }
      if (this.communityCertificate.nativeElement.files.length !== 0) {
        this.communityCertificate.nativeElement.value = null;
      }
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
    this._registrationForm.form.controls['_state'].patchValue(this.obj.State);
    this._registrationForm.form.controls['_schlname'].patchValue(this.obj.SchoolName);
  }
}
