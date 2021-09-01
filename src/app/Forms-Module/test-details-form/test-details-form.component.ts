import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-test-details-form',
  templateUrl: './test-details-form.component.html',
  styleUrls: ['./test-details-form.component.css']
})

export class TestDetailsFormComponent implements OnInit {
  subjectOptions: SelectItem[];
  subject: string;
  testDate: Date = new Date();
  questionTypeOptions: SelectItem[];
  questionType: string = 'Multiple Choice';
  totalMarks: any;
  totalDuration: any;
  testNameOptions: SelectItem[];
  testName: string;
  classOptions: SelectItem[];
  class: string;
  description: string;
  durationTypeOptions: SelectItem[];
  durationType: string;
  fileName: string;
  cell_range: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.durationTypeOptions = [
      { label: 'Mins', value: 'M' },
      { label: 'Hrs', value: 'H' }
    ];
    this.questionTypeOptions = [
      { label: 'Multiple Choice', value: 1}
    ]
  }

  uploadData($event) {
    let filesData = $event.target.files;
    console.log('eve', filesData);
    this.parseExcel(filesData[0]);
  }

  parseExcel(file) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const arrayBuffer: any = fileReader.result;
      console.log('buff', arrayBuffer);
      var data = new Uint8Array(arrayBuffer);
      console.log('data', data);
    }
  }

  onSave() { }

  onDownload() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8';
    const path = "../../assets/files/questions.xlsx";
    const filename = 'Sample_Excel' + ".xlsx";
    saveAs(path, filename);
 }
}
