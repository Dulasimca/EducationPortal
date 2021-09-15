import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';





@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  MRowId:0
  Subject: string;
  Author:string;
  yearOptions: SelectItem[];
  selectedyear: string;
  cols: any; 
  form:any;
  data: any = [];
  uploadedFiles: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private masterService: MasterService,private messageService: MessageService) { }

  ngOnInit(): void {

    
    this.yearOptions = [
      { label: '2019-2020', value: '2019-2020' },
      { label: '2020-2021', value: '2020-2021' },
      { label: '2021-2022', value: '2021-2022' },
    ];
    this.cols = [
      {field:'RowId',header: 'ID'},
      {field: 'Years',header: 'Year'},
      {field:'subjects',header: 'Subject'},
      {field: 'authorReference',header: 'Author/Reference'},
      {field: 'Pdffilename',header: 'Book Upload'},
      {field: 'CreatedDate',header: 'Upload date'},
      
      
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
    this.blockUI.start();
    const params = {
    
      'RowId': this.MRowId,
      'SchoolId': 1,
      'ClassId': 1,
      'subjects': this.Subject,     
      'authorReference': this.Author,
      'Pdffilename': 'Book.pdf',  
      'Years': this.selectedyear,   
      'Flag': 1,  
      
      
     
    };
    console.log(params);
    this.restApiService.post(PathConstants.Book_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.onClear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
        } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
        }
        }, (err: HttpErrorResponse) => {
        this.blockUI.stop();
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
        })
      }

  onview() {
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })

  }
  onClear()
  {
  //this.date = '',
  this.Subject = '',
  this.Author = '',
  this.selectedyear = ''
  }
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.Author = selectedRow.authorReference;
    this.Subject = selectedRow.subjects;
    this.selectedyear = selectedRow.Years;
}
}
