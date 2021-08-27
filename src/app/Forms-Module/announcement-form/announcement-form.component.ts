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

  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'DATE' },
      { field: 'tag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' }
      ];
  }

}
