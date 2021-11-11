import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { TableConstants } from 'src/app/Common-Module/TableConstants';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  years: year[];
  selectedyear: year;
  cols: any;
  data: any = [];
  visible: boolean;
  @ViewChild('dialog', { static: false }) _dialogPane: Dialog;

  constructor() { }

  ngOnInit() {
    this.years = [
      { name: '2020-2021', code: '2021' },
      { name: '2021-2022', code: '2122' },
    ];
    this.cols = TableConstants.MCQTestResultColumns;
    this.data = [{ 'ID': 1, 'subject': 'Tamil', 'test': 'Pre-midterm Assessment' },
    { 'ID': 2, 'subject': 'English', 'test': 'Pre-Mid Term Exam' },
    { 'ID': 3, 'subject': 'Maths', 'test': 'Pre-Midterm' },
    { 'ID': 4, 'subject': 'Science', 'test': 'Pre-Midterm Examination' },
    { 'ID': 5, 'subject': 'Social Science', 'test': 'Pre-Midterm Examination' }]
  }

  openDialog() {
    this.visible = true;
    this._dialogPane.showHeader = false;
  }

}
interface year {
  name: string,
  code: string
}



