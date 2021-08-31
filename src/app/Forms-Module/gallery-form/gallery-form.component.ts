import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit {
  tittle:string;

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
