import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService } from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';




@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {
  RowId: string;
  MRowId=0;
  SchoolID:string;
  Topic: string;
  uploadedFiles: any[] = [];
  cols: any; 
  date: Date = new Date();
  data: any = [];
  guardianimg: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  constructor(private restApiService: RestAPIService, private datepipe: DatePipe, 
    private http: HttpClient, private masterService: MasterService,private messageService: MessageService) { }


  ngOnInit(): void {

    this.cols = [
      {field:'RowId',header: 'ID'},
      {field:'NewsDate',header: 'Date'},
      {field:'Topic',header: 'Topic'},
      {field:'Download',header: 'Newsletter Upload'},
      {field: 'CreatedDate',header: 'Upload date'},
      
    ];
  }


  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
   reader.readAsDataURL(selectedFile);
   console.log('url', reader.readAsDataURL(selectedFile));
    var endpoint = '../../assets/layout/circular_image';
    this.http.post(endpoint, selectedFile).subscribe
    (res => 
    {

   })
  }
  onSubmit() {
   
    const params = {
      'RowId': this.MRowId,
      'SchoolID': 1,      
      'Topic': this.Topic,    
      'NewsDate': this.datepipe.transform(this.date,'MM/dd/yyyy'), 
      'Download':'Newsletter.pdf', // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'Flag': 1,
    };
    console.log(params);
    this.restApiService.post(PathConstants.NewsLetter_Post, params).subscribe(res => {
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
    
    this.restApiService.getByParameters(PathConstants.NewsLetter_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        console.log(res);
        this.data = res;
      }
      
    })

  }

  onClear()
  {
  
  this.Topic = ''
 
  }
  
  onRowSelect(event, selectedRow) {
    this.MRowId = selectedRow.RowId;
    this.Topic = selectedRow.Topic;
    this.date = selectedRow.NewsDate;
    
    
  }

  
}
