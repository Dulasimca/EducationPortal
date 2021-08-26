import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  date: Date = new Date();
  Announcement: string;
  

   constructor() { }

  ngOnInit(): void {
  }

}
