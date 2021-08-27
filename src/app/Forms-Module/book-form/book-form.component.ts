import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  Subject: string;
  Author:string;
  constructor() { }

  ngOnInit(): void {
  }

}
