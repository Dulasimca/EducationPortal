import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  date: Date = new Date();
  tag:string;
  Announcement: string;
  data: any = []; 
  cols: any;
  uploadedFiles: any[] = [];

  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'DATE' },
      { field: 'tag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' }
      ];
  }
  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
