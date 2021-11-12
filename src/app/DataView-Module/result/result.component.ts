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
      // { name: '2020-2021', code: '2021' },
      { name: '2021-2022', code: '2122' }
    ];
    this.cols = TableConstants.MCQTestResultColumns;
    this.data = [{ 'ID': 1,'subject': 'Tamil', 'test': 'Slip Test for Lesson II- Week 40' },
    { 'ID': 2,'subject': 'English', 'test': 'Slip Test for Lesson II - Week 40' },
    { 'ID': 3,'subject': 'Maths', 'test': 'Slip Test for Lesson II- Week 40' },
    { 'ID': 4,'subject': 'Science', 'test': 'Slip Test for Lesson II - Week 40' },
    { 'ID': 5,'subject': 'Social Science', 'test': 'Slip Test for Lesson II - Week 40' },
    { 'ID': 6,'subject': 'Tamil', 'test': 'Slip Test for Chapter I - Month of Oct' },
    { 'ID': 7,'subject': 'English', 'test': 'Slip Test for Chapter I - Month of Oct' },
    { 'ID': 8,'subject': 'Maths', 'test': 'Slip Test for Chapter I - Month of Oct' },
    { 'ID': 9,'subject': 'Science', 'test': 'Slip Test for Chapter I - Month of Oct' },
    { 'ID': 10,'subject': 'Social Science', 'test': 'Slip Test for Chapter I - Month of Oct' }]
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



