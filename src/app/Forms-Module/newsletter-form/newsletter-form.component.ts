import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {
  
  Subject: string;

  uploadedFiles: any[] = [];

  date: Date = new Date();
  data: any = [];
  
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
