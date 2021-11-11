import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { Profile } from 'src/app/Interfaces/profile';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { UserService } from 'src/app/Services/user.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { isUint16Array } from 'util/types';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  responseData: Profile[] = [];
  obj: Profile = {} as Profile;
  yearRange: string;
  classOptions: SelectItem[];
  sectionOptions: SelectItem[];
  genderOptions: SelectItem[];
  mediumOptions: SelectItem[];
  casteOptions: SelectItem[];
  bloodGroupOptions: SelectItem[];
  religionOptions: SelectItem[];
  cityOptions: SelectItem[];
  nationalityOptions: SelectItem[];
  userImage: any;
  fatherImage: any;
  motherImage: any;
  guardinaImage: any;
  //masters
  sections?: any;
  classes?: any;
  genders?: any;
  castes?: any;
  mediums?: any;
  bloodGroups?: any;
  religions?: any;
  nationalities?: any;
  cities?: any;
  logged_user: User;
  folderName: string = '';
  isDirty: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('f', { static: false }) _personalDetailsForm: NgForm;
  public formData = new FormData();

  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private datePipe: DatePipe, public _d: DomSanitizer, private userService: UserService, private masterService: MasterService,
    private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.responseData = this.userService.getResponse();
    this.userService.getResponse();
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    const roleID = (this.logged_user.roleId !== null) ? Number.parseInt(this.logged_user.roleId) : null;
    this.folderName = (roleID === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration;
    this.obj = {} as Profile;
    this.loadData();
    this.masterService.getMaster('');
  }

  loadData() {
    if (this.responseData !== null && this.responseData !== undefined) {
      if (this.responseData.length !== 0) {
        this.responseData.forEach((i: any) => {
          this.obj = i;
          this.obj.DateofBirth = this.datePipe.transform(i.DateofBirth, 'MM/dd/yyyy'),
            this.obj.DateofJoining = this.datePipe.transform(i.DateofJoining, 'MM/dd/yyyy'),
            this.obj.StudentPhotoFileName = (i.StudentPhotoFileName !== undefined && i.StudentPhotoFileName !== null) ?
              (i.StudentPhotoFileName.toString().trim() !== '' ? i.StudentPhotoFileName : '') : '',
            this.obj.FatherPhotoFileName = (i.FatherPhotoFileName !== undefined && i.FatherPhotoFileName !== null) ?
              (i.FatherPhotoFileName.toString().trim() !== '' ? i.FatherPhotoFileName : '') : '',
            this.obj.MotherPhotoFilName = (i.MotherPhotoFilName !== undefined && i.MotherPhotoFilName !== null) ?
              (i.MotherPhotoFilName.toString().trim() !== '' ? i.MotherPhotoFilName : '') : '',
            this.obj.GaurdianPhotoFileName = (i.GaurdianPhotoFileName !== undefined && i.GaurdianPhotoFileName !== null) ?
              (i.GaurdianPhotoFileName.toString().trim() !== '' ? i.GaurdianPhotoFileName : '') : '',
            this.classOptions = [{ label: i.Classname2, value: i.ClassId }];
          this.sectionOptions = [{ label: i.SectionName, value: i.SectionId }];
          this.mediumOptions = [{ label: i.MediumName, value: i.Medium }];
          this.bloodGroupOptions = [{ label: i.BloodGroupName, value: i.BloodGroup }];
          this.genderOptions = [{ label: i.GenderName, value: i.Gender }];
          var folder = ((this.logged_user.roleId * 1) === 6) ? FileUploadConstant.StudentRegistration : 
          FileUploadConstant.TeacherRegistration;
          this.fatherImage = '../../assets/layout/'+folder+'/'+ this.obj.FatherPhotoFileName;
          this.userImage = '../../assets/layout/'+folder+'/'+ this.obj.StudentPhotoFileName;
          this.motherImage = '../../assets/layout/'+folder+'/'+ this.obj.MotherPhotoFilName;
          this.guardinaImage = '../../assets/layout/'+folder+'/'+ this.obj.GaurdianPhotoFileName;
        })
      } else {
        this.router.navigate(['/profile']);
      }
    } else {
      this.router.navigate(['/profile']);
    }
  }

  onSelect(type) {
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');
    this.castes = this.masterService.getMaster('CS');
    this.genders = this.masterService.getMaster('G');
    this.mediums = this.masterService.getMaster('M');
    this.bloodGroups = this.masterService.getMaster('B');
    this.religions = this.masterService.getMaster('RL');
    this.nationalities = this.masterService.getMaster('N');
    let nationalitySelection = [];
    let casteSelection = [];
    let mediumSelection = [];
    let genderSelection = [];
    let religionSelection = [];
    let bloodgroupSelection = [];
    let classSelection = [];
    let sectionSelection = [];
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
      case 'CS':
        this.castes.forEach(s => {
          casteSelection.push({ label: s.name, value: s.code })
        });
        this.casteOptions = casteSelection;
        this.casteOptions.unshift({ label: '-select', value: null });
        break;
      case 'G':
        this.genders.forEach(s => {
          genderSelection.push({ label: s.name, value: s.code })
        });
        this.genderOptions = genderSelection;
        this.genderOptions.unshift({ label: '-select', value: null });
        break;
      case 'B':
        this.bloodGroups.forEach(s => {
          bloodgroupSelection.push({ label: s.name, value: s.code })
        });
        this.bloodGroupOptions = bloodgroupSelection;
        this.bloodGroupOptions.unshift({ label: '-select', value: null });
        break;
      case 'RL':
        this.religions.forEach(s => {
          religionSelection.push({ label: s.name, value: s.code })
        });
        this.religionOptions = religionSelection;
        this.religionOptions.unshift({ label: '-select', value: null });
        break;
      case 'N':
        this.nationalities.forEach(s => {
          nationalitySelection.push({ label: s.name, value: s.code })
        });
        this.nationalityOptions = nationalitySelection;
        this.nationalityOptions.unshift({ label: '-select', value: null });
        break;
      case 'M':
        this.mediums.forEach(s => {
          mediumSelection.push({ label: s.name, value: s.code })
        });
        this.mediumOptions = mediumSelection;
        this.mediumOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onSave() {
    this.blockUI.start('submitting...');
    this.obj.DateofBirth = (typeof (this.obj.DateofBirth) === 'object') ?
      this.datePipe.transform(this.obj.DateofBirth, 'MM/dd/yyyy') : this.obj.DateofBirth;
    this.obj.DateofJoining = (typeof (this.obj.DateofJoining) === 'object') ?
      this.datePipe.transform(this.obj.DateofJoining, 'MM/dd/yyyy') : this.obj.DateofJoining;
    this.restApiService.post(PathConstants.Registration_Post, this.obj).subscribe(res => {
      if (res) {
        this.clearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
        setTimeout(() => {
          this.blockUI.stop();
          this.router.navigate(['/profile'])
        }, 500)
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
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NetworkErrorMessage
        })
      }
    })
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    let actualFilename = '';

    const filename = fileToUpload.name + '^' + this.folderName;
    this.formData.append('file', fileToUpload, filename);
    actualFilename = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
        if(event) {
          this.isDirty = true;
        } else {
          this.isDirty = false;
        }
      }
      );
    return actualFilename;
  }

  onFileUpload($event, id) {
    const file = $event.srcElement.files[0];
    this.isDirty = true;
    console.log('dty', this.isDirty)
    switch (id) {
      case 1:
        const s_URL = window.URL.createObjectURL(file);
        this.userImage = this._d.bypassSecurityTrustUrl(s_URL);
        this.obj.StudentPhotoFileName = this.uploadFile($event.target.files);
        break;
      case 2:
        const f_URL = window.URL.createObjectURL(file);
        this.fatherImage = this._d.bypassSecurityTrustUrl(f_URL);
        this.obj.FatherPhotoFileName = this.uploadFile($event.target.files);
        break;
      case 3:
        const m_URL = window.URL.createObjectURL(file);
        this.motherImage = this._d.bypassSecurityTrustUrl(m_URL);
        this.obj.MotherPhotoFilName = this.uploadFile($event.target.files);
        break;
      case 4:
        const g_URL = window.URL.createObjectURL(file);
        this.guardinaImage = this._d.bypassSecurityTrustUrl(g_URL);
        this.obj.GaurdianPhotoFileName = this.uploadFile($event.target.files);
        break;
      // case 5:
      //   this.obj.IncomeFilename = this.uploadFile($event.target.files);
      //   break;
      // case 6:
      //   this.obj.CommunityFilename = this.uploadFile($event.target.files);
      //   break;
      // case 7:
      //   this.obj.NativityFilename = this.uploadFile($event.target.files);
      //   break;

    }
  }

  clearForm() {
    // this.obj = null;
    this._personalDetailsForm.reset();
    this._personalDetailsForm.form.markAsUntouched();
    this._personalDetailsForm.form.markAsPristine();
    this.genderOptions = [];
    this.mediumOptions = [];
    this.bloodGroupOptions = [];
    this.classOptions = [];
    this.sectionOptions = [];
    this.userImage = '';
    this.isDirty = false;
  }
}
