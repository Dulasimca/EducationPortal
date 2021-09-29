import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';


import { Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  MRowId=0 
  data: any = [];
  cols: any;
  books : any = []
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {
    
    this.cols = [
      //{field: 'RowId',header: 'ID'},
      {field: 'Years',header: 'Year'},
      {field: 'ClassId',header:'Class'},
      {field:'subjects',header: 'Subject'},
      {field: 'authorReference',header: 'Author/Reference'},
      //{field: 'Pdffilename',header: 'Book Download'},
      {field: 'CreatedDate',header: 'Download date'},
      
      
    ];
    this.onview()
  }
  onview() {
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })
}
onDownload(Filename) {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
  const path = "../../assets/layout/"+FileUploadConstant.Booksfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
}
}

interface FolderOptions {
  FolderPath?: string;
}

