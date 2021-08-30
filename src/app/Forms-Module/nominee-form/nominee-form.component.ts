import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {
  Class: string;
  Section: string;
  Name: string;
  positionOptions:SelectItem[];
  selectedPosition: string;

  constructor() { }

  ngOnInit(): void {
    this.positionOptions = [
      { label: 'Class Representative', value: 'L'},
      { label: 'School Representative', value: 'H'},
    ];
  }

}
