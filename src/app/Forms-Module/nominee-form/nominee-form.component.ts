import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {
  date: Date = new Date();
  Class: string;
  Section: string;
  Name: string;
  positionOptions:SelectItem[];
  selectedPosition: string;

  constructor() { }

  ngOnInit(): void {
    this.positionOptions = [
      { label: 'Class Representative', value: 'C'},
      { label: 'School Representative', value: 'S'},
    ];
  }

}
