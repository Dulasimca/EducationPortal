import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import {NgForm} from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-circular-form',
  templateUrl: './circular-form.component.html',
  styleUrls: ['./circular-form.component.css']
})
export class CircularFormComponent implements OnInit {

  Subject: string;
  Details:string;
  RowId: string;
  MRowId:0;
  school_id:string;
  cols: any;

  date: Date = new Date();
  data: any = [];

  guardianimg: any[] = [];
  
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {

    this.cols = [
      {field:'RowId',header: 'ID'},
      {field: 'CircularDate',header: 'Circular Date'},
      {field:'Subject',header: 'Subject'},
      {field: 'Details',header: 'Details'},
      {field: 'Download',header: 'Circular Upload'},
     // {field: 'CreatedDate',header: 'Upload date'},
      
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
     
      
      'RowId': this.MRowId,
      'SchoolID':  1,
      'CircularDate': this.date, 
      'Subject': this.Subject,
      'Details': this.Details,
      'Download':'Circular.pdf',// (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'Flag':  true
     
    };
    console.log(params);
    this.restApiService.post(PathConstants.Circular_Post, params).subscribe(res => {
      console.log('rs', res);
    });
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


  onClear()
  {
  //this.date = '',
  this.Subject = '',
  this.Details = ''
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.date = selectedRow.CircularDate;
    this.Subject = selectedRow.Subject;
    this.Details = selectedRow.Details;
}

}