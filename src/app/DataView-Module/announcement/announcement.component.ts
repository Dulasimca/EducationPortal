import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  
  data: any = []; 
  cols: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
    
      { field: 'Announcementdate', header: 'Date', width: '100px' },
      { field: 'AnnouncementTag', header: 'Title', width: '100px'},
      { field: 'Announcement', header: 'Announcement', width :'400px' },
 
      ];
    this.onView()
  }
  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    const path = "../../assets/layout/"+FileUploadConstant.Announcementfolder+"/"+Filename;
    saveAs(path, Filename);
  },
  reject: (type) => { }
  });
  
  }
  
  onView() {
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Announcement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });

  }

}