import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {
  RowId: string;
  SchoolID:string;
  
  Topic: string;

  uploadedFiles: any[] = [];

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
      'RowID': 0,
      'SchoolID': 1,      
      'Topic': this.Topic,     
      'Download':'1', // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'Flag': 1,
    };
    console.log(params);
    this.restApiService.post(PathConstants.NewsLetter_Post, params).subscribe(res => {
      console.log('rs', res);
    });
  }
}
