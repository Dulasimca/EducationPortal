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
// import { isUint16Array } from 'util/types';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  responseData: Profile[] = [];
  obj: Profile;
  yearRange: string;
  classOptions: SelectItem[];
  sectionOptions:  SelectItem[];
  genderOptions: SelectItem[];
  mediumOptions: SelectItem[];
  userImage: any;
  fatherImage: any;
  motherImage: any;
  guardinaImage: any;
   //masters
   sections?: any;
   classes?: any;
   logged_user: User;
   folderName: string = '';
  @ViewChild('f', { static: false }) _personalDetailsForm: NgForm;
  public formData = new FormData();

  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private datePipe: DatePipe,  public _d: DomSanitizer, private userService: UserService, private masterService: MasterService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.responseData = this.userService.getResponse();
    this.userService.getResponse();
    const current_year = new Date().getFullYear();
    const start_year_range = current_year - 30;
    this.yearRange = start_year_range + ':' + current_year;
    const roleID = (this.logged_user.roleId !== null) ? Number.parseInt(this.logged_user.roleId) : null;
    this.folderName = (roleID === 6) ? FileUploadConstant.StudentRegistration : FileUploadConstant.TeacherRegistration
    this.loadData();
    // const user: User = this.authService.UserInfo;
    // this.userImage = (user.studentImg.trim() !== '') ? user.studentImg : '';

   
    ///loading master data
    this.sections = this.masterService.getMaster('S');
    this.classes = this.masterService.getMaster('C');

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
  }
  
  loadData() {
    if (this.responseData !== null && this.responseData !== undefined) {
      if (this.responseData.length !== 0)
        this.responseData.forEach((i: any) => {
          this.obj = {
            RoleId: i.RoleId,
            slno: i.slno,
            ID: i.ID,
            FirstName: i.FirstName,
            LastName: i.LastName,
            Password: i.Password,
            DateofBirth: this.datePipe.transform(i.DateofBirth, 'yyyy-MM-dd'),
            DateofJoining: this.datePipe.transform(i.DateofJoining, 'yyyy-MM-dd'),
            Gender: i.Gender,
            Medium: i.MediumName,
            Nationality: i.Nationality,
            BloodGroup: i.BloodGroup,
            Class: i.Class,
            ClassId: i.ClassId,
            Section: i.Section,
            SectionId: i.SectionId,
            StudentPhotoFileName: (i.StudentPhotoFileName !== undefined && i.StudentPhotoFileName !== null) ?
            (i.StudentPhotoFileName.toString().trim() !== '' ? ('../../assets/layout/' + this.folderName +'/'+ i.StudentPhotoFileName) : '') : '',
            Caste: i.Caste,
            Addressinfo: i.Addressinfo,
            PermanentAddress: i.PermanentAddress,
            SchoolName: i.SchoolName,
            SchoolId: i.SchoolId,
            PhoneNumber: i.PhoneNumber,
            AltNumber: i.AltNumber,
            Nameoflastschool: i.Nameoflastschool,
            LastchoolTelephone: i.LastchoolTelephone,
            District: i.District,
            DistrictId: i.DistrictId,
            Postalcode: i.Postalcode,
            EmailId: i.EmailId,
            City: i.City,
            State: i.State,
            Flag: i.Flag,
            UserId: i.UserId,
            Religion: i.religion,
            FatherName: i.FatherName,
            FatherEmailid: i.FatherEmailid,
            FatherMobileNo: i.FatherMobileNo,
            FatherOccupation: i.FatherOccupation,
            FatherPhotoFileName: (i.FatherPhotoFileName !== undefined && i.FatherPhotoFileName !== null) ?
            (i.FatherPhotoFileName.toString().trim() !== '' ? ('../../assets/layout/' + this.folderName +'/'+ i.FatherPhotoFileName) : '') : '',
            MotherName: i.MotherName,
            MotherEmailid: i.MotherEmailid,
            MotherOccupation: i.MotherOccupation,
            MotherMobileNo: i.MotherMobileNo,
            MotherPhotoFilName: (i.MotherPhotoFilName !== undefined && i.MotherPhotoFilName !== null) ?
            (i.MotherPhotoFilName.toString().trim() !== '' ? ('../../assets/layout/' + this.folderName +'/'+ i.MotherPhotoFilName) : '') : '',
            GaurdianName: i.GaurdianName,
            GaurdianEmailid: i.GaurdianEmailid,
            GaurdianMobileNo: i.GaurdianMobileNo,
            GaurdianOccupation: i.GaurdianOccupation,
            GaurdianPhotoFileName: (i.GaurdianPhotoFileName !== undefined && i.GaurdianPhotoFileName !== null) ?
            (i.GaurdianPhotoFileName.toString().trim() !== '' ? ('../../assets/layout/' + this.folderName +'/'+ i.GaurdianPhotoFileName) : '') : '',
            FatherYearlyIncome: i.FYearlyIncome,
            MotherYearlyIncome: i.MYearlyIncome,
            Disability: i.Disability,
            IncomeFilename: i.IncomeFilename,
            NativityFilename: i.NativityFilename,
            CommunityFilename: i.CommunityFilename,
          }
          this.classOptions = [{ label: i.Class, value: i.ClassId }];
          this.sectionOptions = [{ label: i.Section, value: i.SectionId }];
          this.fatherImage = this.obj.FatherPhotoFileName;
          this.userImage = this.obj.StudentPhotoFileName;
          this.motherImage = this.obj.MotherPhotoFilName;
          this.guardinaImage = this.obj.GaurdianPhotoFileName;
        })
    }
  }
  onSelect(type) {
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
    }
  }

  onSave() { 
    this.obj.Section = (this.obj.Section.label !== undefined && this.obj.Section.label !== null) ? 
    this.obj.Section.label : this.obj.Section;
    this.obj.SectionId = (this.obj.Section.label !== undefined && this.obj.Section.label !== null) ? 
    this.obj.Section.value : this.obj.SectionId;
    this.obj.Class = (this.obj.Class.label !== undefined && this.obj.Class.label !== null) ? 
    this.obj.Class.label : this.obj.Class;
    this.obj.ClassId = (this.obj.Class.label !== undefined && this.obj.Class.label !== null) ? 
    this.obj.Class.value : this.obj.ClassId;

    this.restApiService.post(PathConstants.Registration_Post, this.obj).subscribe(res => {
      if (res) {
        this.clearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
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
    console.log('file', fileToUpload);
    console.log('formdata', this.formData);
    actualFilename = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
      }
      );
    console.log('retn', actualFilename);
    return actualFilename;
  }

  onFileUpload($event, id) {
    const file = $event.srcElement.files[0];
    switch (id) {
      case 1:
        const s_URL = window.URL.createObjectURL(file);
        this.userImage = this._d.bypassSecurityTrustUrl(s_URL);
        this.obj.StudentPhotoFileName = this.uploadFile($event.target.files);
        break;
      case 2:
        const f_URL = window.URL.createObjectURL(file);
        this.fatherImage = this._d.bypassSecurityTrustUrl(f_URL);
        console.log('father', this.fatherImage);
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
}
}
