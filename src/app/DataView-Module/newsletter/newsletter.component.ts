import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';

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
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() {
    
    this.cols = [
      {field:'RowId',header: 'ID'},
      {field:'NewsDate',header: 'Date'},
      {field:'Topic',header: 'Topic'},
      {field:'Download',header: 'Newsletter Upload'},
      {field: 'CreatedDate',header: 'Upload date'},
      
      
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
onDownload() {
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8';
  const path = "../../assets/files/sample_Project.pdf";
  const filename = 'sample_Project' + ".pdf";
  saveAs(path, filename);
}
}

