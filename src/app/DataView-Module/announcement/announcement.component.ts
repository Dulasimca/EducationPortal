import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  
  data: any = []; 
  cols: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'RowId', header: 'ID' },
      { field: 'Announcementdate', header: 'DATE' },
      { field: 'AnnouncementTag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' },
      // { field: 'Announcementfilename', header: 'Announcementfilename'}
      ];
    this.onView()
  }
  onDownload(Filename) {
    //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
    const path = "../../assets/layout/"+FileUploadConstant.Announcementfolder+"/"+Filename;
    //const filename = 'files' + ".pdf";
    saveAs(path, Filename);
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