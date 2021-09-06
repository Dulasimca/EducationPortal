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
  school_id:string;
 

  date: Date = new Date();
  data: any = [];

  guardianimg: any[] = [];
  
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
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
     
      // 'ID': (this.regId !== undefined && this.regId !== null) ? this.regId : 0,
      // 'slno': (this.slno !== undefined && this.slno !== null) ? this.slno : 0,
      'RowID': (this.RowId !== undefined && this.RowId !== null) ? this.RowId : 0,
      'SchoolID': (this.school_id !== undefined && this.school_id !== null) ? this.school_id : 1,
      'CircularDate': (this.date !== undefined && this.date !== null) ? this.date : 0,
      //'CircularDate' : this.Circulardate
      'Subject': this.Subject,
      'Details': this.Details,
      'Download':'123.png',// (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'Flag':  true
      //'Download':
      //'Flag' 
    };
    console.log(params);
    this.restApiService.post(PathConstants.Circular_Post, params).subscribe(res => {
      console.log('rs', res);
    });
  }

// onSave(form: NgForm) { 
//   //alert("hi")
//   //alert(this.date)
   
//   var detail = {
//    'subject': (this.Subject !==undefined && this.Subject !==null) ? this.Subject : "",
//    'instruction': (this.Instructions !==undefined && this.Instructions !==null) ? this.Instructions : "",
//    'date': (this.date !==undefined && this.date !==null) ? this.date : "",
//    'upload': (this._guardianimg !==undefined && this._guardianimg !==null) ? this._guardianimg : "",
//    'school_id': (this.school_id !==undefined && this.school_id !==null) ? this.school_id : ""
  
//   }
  //alert(detail);
  //console.log(detail);
  // this.http.post('http://localhost:7440/api/circular', detail).subscribe(response => {
  //   if(response) {
  //     alert("saved successfully");
  //         form.resetForm();
  //    //this.onview();
  //   }

  // })


}

