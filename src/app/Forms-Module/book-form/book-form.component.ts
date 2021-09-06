import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  Subject: string;
  Author:string;
  yearOptions: SelectItem[];
  selectedyear: string;
  uploadedFiles: any[] = [];
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.yearOptions = [
      { label: '2019-2020', value: '2020' },
      { label: '2020-2021', value: '2021' },
      { label: '2021-2022', value: '2122' },
    ];
    
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
    var endpoint = '../../assets/layout';
    this.http.post(endpoint, selectedFile).subscribe(res => {

    })
  }
  onSubmit() {
    const params = {
    
      'RowId': '0',
      'SchoolId': 1,
      'ClassId': 1,
      'subjects': this.Subject,     
      'authorReference': this.Author,
      'Pdffilename': 'mn.pdf',      
      'Flag': 1,  
      
     
    };
    this.restApiService.post(PathConstants.Book_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }
}
