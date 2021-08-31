import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-form',
  templateUrl: './circular-form.component.html',
  styleUrls: ['./circular-form.component.css']
})
export class CircularFormComponent implements OnInit {
  Subject: string;
  Instructions:string;
  
  date: Date = new Date();
  data: any = [];

  uploadedFiles: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }
  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
