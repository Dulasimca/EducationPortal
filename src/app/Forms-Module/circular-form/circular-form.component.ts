import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-circular-form',
  templateUrl: './circular-form.component.html',
  styleUrls: ['./circular-form.component.css']
})
export class CircularFormComponent implements OnInit {
  Subject: string;
  Instructions:string;
  
  school_id:string;
  date: Date = new Date();
  data: any = [];

  _guardianimg: any[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onFileUpload($event, id) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
     //}

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}


onSave(form: NgForm) { 
  //alert("hi")
  //alert(this.date)
   
  var detail = {
   'subject': (this.Subject !==undefined && this.Subject !==null) ? this.Subject : "",
   'instruction': (this.Instructions !==undefined && this.Instructions !==null) ? this.Instructions : "",
   'date': (this.date !==undefined && this.date !==null) ? this.date : "",
   'upload': (this._guardianimg !==undefined && this._guardianimg !==null) ? this._guardianimg : "",
   'school_id': (this.school_id !==undefined && this.school_id !==null) ? this.school_id : ""
  
  }
  //alert(detail);
  console.log(detail);
 /* this.http.post('http://localhost:22100/api/employee/post', detail).subscribe(response => {
    if(response) {
      alert("saved successfully");
          form.resetForm();
     this.onview();
    }

  })*/

}

}
