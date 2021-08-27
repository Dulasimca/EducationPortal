import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  date: Date = new Date();
  data: any = []; 
  cols: any;

  constructor() { }

  ngOnInit(): void {
  }

}
