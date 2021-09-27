import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit {

  MRowId=0
  data: any = [];
  cols: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {

    this.onview()
  

    this.cols = [
      //{field: 'RowId',header: 'ID'},
      {field: 'CircularDate',header: 'Circular Date'},
      {field:'Subject',header: 'Subject'},
      {field: 'Details',header: 'Details'},
     // {field: 'Download',header: 'Circular Download'},
    
      
    ];

  }
  onview() {
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.Circular_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })

  }
  onDownload(Filename) {
    //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
    const path = "../../assets/layout/"+FileUploadConstant.Circularfolder+"/"+Filename;
    //const filename = 'files' + ".pdf";
    saveAs(path, Filename);
  }
  }
  
  interface FolderOptions {
    FolderPath?: string;
  }
  
  