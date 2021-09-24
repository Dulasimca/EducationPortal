import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  date: Date = new Date();
  tag:string;
  Announcement: string;
  Topic:string;
  announce:string;
  data: any = []; 
  MRowid=0;
  cols: any;
  uploadedFiles: any[] = [];
  @ViewChild('f', { static: false }) _AnnouncementForm: NgForm;


  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe,private messageService: MessageService
    ,private authService: AuthService) { }


  ngOnInit(): void {
    this.cols = [
      // { field: 'RowId', header: 'ID' },
      { field: 'SlNo', header: 'Slno'},
      { field: 'Announcementdate', header: 'DATE' },
      { field: 'AnnouncementTag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' },
      { field: 'Announcementfilename', header: 'ANNOUNCEMENT FILENAME'}
      ];
  }

    onFileUpload($event, id) {
      const reader = new FileReader();
      var selectedFile = $event.target.files[0];
    }
  
  
  onSubmit() {
    this.blockUI.start();
   
    const params = {
      'RowID': this.MRowid,
      'SchoolID': 1,      
      'Announcementdate': this.datepipe.transform(this.date,'MM/dd/yyyy'),     
      'AnnouncementTag':this.Topic, 
      'Announcement': this.Announcement,
      'Announcementfilename': "Education.pdf",
      'Flag' : true

    };
    console.log(params);
    this.restApiService.post(PathConstants.Announcement_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.clear();
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
     onView() {
    const params = {
      'SchoolID': 1,
    }
      this.restApiService.getByParameters(PathConstants.Announcement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      let sno = 0;
      this.data.forEach(s => {
        sno += 1;
        s.SlNo = sno;
      });
      }
    });

  }
  clear() {
    this._AnnouncementForm.reset();
    this._AnnouncementForm.form.markAsUntouched();
    this._AnnouncementForm.form.markAsPristine();
    this.Topic="",
    this.Announcement=""
  }
  onRowSelect(event, selectedRow) {
    this.MRowid=selectedRow.RowId;
    this.date = selectedRow.Announcementdate;
    this.Topic = selectedRow.AnnouncementTag;
    this.announce = selectedRow.Announcementfilename;
    this.Announcement = selectedRow.Announcement;
    console.log(selectedRow.RowId);
    // this.commodityOptions = [{ label: selectedRow.CommodityName, value: selectedRow.CommodityID }];
    // this.TaxtypeOptions = [{ label: selectedRow.TaxType, value: selectedRow.Tax }];
    // this.MeasurementOptions = [{ label: selectedRow.Measurement, value: selectedRow.measurement }];
    // this.Pan = (selectedRow.TIN === 'URD') ? '' : selectedRow.Pan;
    // this.Gst = (selectedRow.TIN === 'URD') ? 'URD' : selectedRow.GSTNo;
    // this.State = (selectedRow.TIN === 'URD') ? '' : selectedRow.StateCode;
  }
  
  
 
}
