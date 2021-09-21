import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-downloadsession-form',
  templateUrl: './downloadsession-form.component.html',
  styleUrls: ['./downloadsession-form.component.css']
})
export class DownloadsessionFormComponent implements OnInit {

  Subject:string;
  Duration:string;
  date: Date = new Date();
  data: any = [];
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
   reader.readAsDataURL(selectedFile);
   console.log('url', reader.readAsDataURL(selectedFile));
    // var endpoint = '../../assets/layout/circular_image';
    // this.http.post(endpoint, selectedFile).subscribe
    (res => 
    {

   })
  }
}
