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
  
  constructor(private restApiService: RestAPIService, private http: HttpClient,private authService: AuthService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    this.cols = [
      { field: 'AssignId', header: 'ID'},
      { field: 'AssignmentDate', header: 'Date' },
      { field: 'AssignmentDueDate', header: 'Due Date' },
      { field: 'AssignmentWork', header: 'Assigned Work' },
      { field: 'AssignmentType', header: 'Assigned Type' },
      { field: 'Subjectname', header: 'Subject Name' },
  ];
    this.onView()
  }
  onFileUpload($event, id) {
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.formData = new FormData()
    let fileToUpload: any = <File>files[0];
    const filename = fileToUpload.name + '^' + FileUploadConstant.Assignmentfolder;
    this.formData.append('file', fileToUpload, filename);
    console.log('file', fileToUpload);
    console.log('formdata', this.formData);
    this.NewFileName=fileToUpload.name;
    this.http.post(this.restApiService.BASEURL +PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => 
        {
      //          if (event.type === HttpEventType.UploadProgress)
      //    this.progress = Math.round(100 * event.loaded / event.total);
      //   else if (event.type === HttpEventType.Response) {
      //    this.message = 'Upload success.';
        
      //  //   this.onUploadFinished.emit(event.body);
      //   }
      }
      );
  }  

  onDownload(Filename) {
    const path = "../../assets/layout/"+FileUploadConstant.Assignmentfolder+"/"+Filename;
    saveAs(path, Filename);
  }

  onView() {
    const params = {
      'SchoolID': this.login_user.schoolId,
      'Class': this.login_user.classId
    }
    this.restApiService.getByParameters(PathConstants.Assignment_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
  
  }




}

