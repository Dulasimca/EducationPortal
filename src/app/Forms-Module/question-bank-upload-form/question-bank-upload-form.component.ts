import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-question-bank-upload-form',
  templateUrl: './question-bank-upload-form.component.html',
  styleUrls: ['./question-bank-upload-form.component.css']
})
export class QuestionBankUploadFormComponent implements OnInit {
  subjectOptions: SelectItem[];
  subject: string;
  yearOptions: SelectItem[];
  year: string;
  description: string;
  classOptions: SelectItem[];
  class: string;
  mediumOptions: SelectItem[];
  medium: string;
  constructor() { }

  ngOnInit(): void {
    this.mediumOptions = [
      { label: 'Tamil', value: 1 },
      { label: 'English', value: 2}
    ];
    this.yearOptions = [
      { label: '2020-2021', value: 2021 },
      { label: '2019-2020', value: 2020 },
      { label: '2018-2019', value: 2019 },
    ];
  }

  uploadData($event) { }

  onUpload() { }

}
