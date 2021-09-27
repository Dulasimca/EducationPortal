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
  //   this.data = [ {'slno': 1, 'tag': 'COVID-19 Pandemic Guidelines', 'date': '03-08-2021', 'announcement': 'Digital/Online Education for schools in Tamil Nadu order issued.'},
  //   {'slno': 2, 'tag': 'Spell Bee Level-2 Exam', 'date': '08-08-2021', 'announcement': 'Spell Bee Level-2 exam will be conducted.'},
  //   {'slno': 3, 'tag': 'School Education', 'date': '10-08-2021', 'announcement': 'Waiver of Collection of Tution fees from the students studying in English Medium classes in Government Government Aided High and Higher Secondary Schools orders issued.'},
  //   {'slno': 4, 'tag': 'Elementary Education', 'date': '10-08-2021', 'announcement': 'Establishment of Smart class Rooms in the first phase in 3000 Government Primary and Middle Schools in rural areas to facilitate learning of subjects with the aid of Information and Communication Technology ICT orders issued.'},
  //   {'slno': 5, 'tag': 'Tourism Announcement', 'date': '11-08-2021', 'announcement': 'Free Educational tour will be arranged for students and teachers with safety measures.'}
  // ]
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