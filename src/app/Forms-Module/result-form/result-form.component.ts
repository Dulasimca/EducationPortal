import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css']
})
export class ResultFormComponent implements OnInit {

  Subject:string;
  Test:string;

  yearOptions: SelectItem[];
  selectedyear: string;
  data: any = [];

  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.yearOptions = [
      { label: '2019-2020', value: '2020' },
      { label: '2020-2021', value: '2021' },
      { label: '2021-2022', value: '2122' },
    ];
  }

  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

}
}
