import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myachievement-form',
  templateUrl: './myachievement-form.component.html',
  styleUrls: ['./myachievement-form.component.css']
})
export class MyachievementFormComponent implements OnInit {

  date: Date = new Date();
  

  data: any = []; 
  cols: any;

  constructor() { }

  ngOnInit(): void {
  }

}
