import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  date: Date = new Date();
  tag:string;
  Announcement: string;
  Topic:string;
  announce:string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }


  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'DATE' },
      { field: 'tag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' }
      ];
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
   // reader.readAsDataURL(selectedFile);
   // console.log('url', reader.readAsDataURL(selectedFile));
    //var endpoint = '../../assets/layout/circular_image';
    //this.http.post(endpoint, selectedFile).subscribe
    (res => 
    {

   })
  }
  
  onSubmit() {
   
    const params = {
      'RowID': 0,
      'SchoolID': 1,      
      'Announcementdate': this.date,     
      'AnnouncementTag':'1', // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'Announcement': '123.png',
      'Announcementfilename': '123.png',
      'Flag' : true

    };
    console.log(params);
    this.restApiService.post(PathConstants.Announcement_Post, params).subscribe(res => {
      console.log('rs', res);
    });
  }
  
 
}
