import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit {
  tittle:string;

  date: Date = new Date();
  data: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
