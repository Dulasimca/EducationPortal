import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { DatePipe } from '@angular/common';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { AuthService } from 'src/app/Services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  data: any = []; 
  cols: any;
  public progress: number;
  public message: string;
  NewFileName:string;
  login_user: User;
  public formData = new FormData();

  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private restApiService: RestAPIService, private http: HttpClient,private authService: AuthService,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    this.cols = TableConstants.AssignmentsColumns;
    this.onView()
  }

  public uploadFile = (event) => {
    this.formData = new FormData()
    let fileToUpload: any = <File>event.target.files[0];
    const filename = fileToUpload.name + '^' + FileUploadConstant.Assignmentfolder;
    this.formData.append('file', fileToUpload, filename);
    // console.log('file', fileToUpload);
    // console.log('formdata', this.formData);
    alert("Uploaded Successfully")
    this.NewFileName=fileToUpload.name;
    this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => 
        {
      }
      );
  }  

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    const path = "../../assets/layout/"+FileUploadConstant.Assignmentfolder+"/"+Filename;
    saveAs(path, Filename);
  },
  reject: (type) => { }
  });
  
  }

  onView() {
    this.data = [];
    const params = {
      'SchoolID':this.login_user.schoolId,
      'ClassId': this.login_user.classId,
      'AssignedBy': 16 
    }
    this.restApiService.getByParameters(PathConstants.Assignment_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      this.data = res;
      }
    });
  
  }




}

