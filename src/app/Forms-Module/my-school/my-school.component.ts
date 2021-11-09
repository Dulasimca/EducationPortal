import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent implements OnInit {
  curriculumOptions:  SelectItem[];
  headMasterName: string;
  email: any;
  address: any;
  pincode: number;
  phoneNo: number;
  landlineNo: number;
  login_user: User;
  faxNo: any;
  curriculum: any;
  hmPhotoFileName: string;
  URL: string;
  showImg: boolean;
  public formData = new FormData();
  @ViewChild('fileSelector', { static: false }) fileSelector: ElementRef;
  @ViewChild('f', { static: false }) _mySchool: NgForm;


  constructor(private restApiService: RestAPIService, private messageService: MessageService,
     private authService: AuthService, private router: Router, private http: HttpClient,
     public _d: DomSanitizer,) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.curriculumOptions = [
      { label: 'Stateboard', value: '01' },
      { label: 'CBSE', value: '02' },
    ]
  }

  public uploadFile = ($event) => {
    this.formData = new FormData();
    const file = $event.srcElement.files[0];
    this.URL = window.URL.createObjectURL(file);
    this.showImg = (this.URL !== undefined && this.URL !== null) ? true : false;
    let fileToUpload: any = <File>$event.target.files[0];
    const filename = fileToUpload.name + '^' + FileUploadConstant.SchoolFolder;
    this.formData.append('file', fileToUpload, filename);
    this.hmPhotoFileName=fileToUpload.name;
    alert(fileToUpload + this.hmPhotoFileName);
    this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => 
        {
      }
      );
  }  

  onRemoveFile() {
    this.fileSelector.nativeElement.value = null;
    this.URL = null;
    this.showImg = false;
  }

  onSave() {
    const params = {
      'Slno': 0,    
      'Curriculum': this.curriculum.label,
      'HMName': this.headMasterName,
      'Emailid': this.email,
      'Addressinfo': this.address,
      'Phone': this.phoneNo,
      'Pincode': this.pincode,
      'Landline': this.landlineNo,
      'Fax': this.faxNo,
      'SchoolId': this.login_user.schoolId,
      'Flag': 1,
      'Filename': this.hmPhotoFileName
    }
    this.restApiService.post(PathConstants.MySchool_Post,params).subscribe(res => {
      if (res) {
        this.clearform();
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

  clearform() {
    this._mySchool.reset();
  }

  onView() {
    this.router.navigate(['/myschool-view'])
  }
}
