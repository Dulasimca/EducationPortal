import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

}
