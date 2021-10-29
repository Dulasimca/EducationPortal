import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';


import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  MRowId=0
  data: any = [];
  cols: any;
  books : any = []
  constructor(private restApiService: RestAPIService, private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    
    this.cols = [
    
      {field:'NewsDate',header: 'Date'},
      {field:'Topic',header: 'Topic'}, 
      
    ];
    this.onview()
  }
  onview() {
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.NewsLetter_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })
}
onDownload(Filename) {
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
 // console.log( "../../assets/layout/"+FileUploadConstant.Newsletterfolder+"/"+Filename);
  const path = "../../assets/layout/"+FileUploadConstant.Newsletterfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
},
reject: (type) => { }
});
}
}

interface FolderOptions {
  FolderPath?: string;
}

