import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';

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

  constructor(private restApiService: RestAPIService, private http: HttpClient,private datepipe: DatePipe) { }


  ngOnInit(): void {
    this.cols = [
      { field: 'RowId', header: 'ID' },
      { field: 'Announcementdate', header: 'DATE' },
      { field: 'AnnouncementTag', header: 'TAG' },
      { field: 'Announcement', header: 'ANNOUNCEMENT' },
      { field: 'Announcementfilename', header: 'Announcementfilename'}
      ];
  }
  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
   // reader.readAsDataURL(selectedFile);
   // console.log('url', reader.readAsDataURL(selectedFile));
    //var endpoint = '../../assets/layout/circular_image';
    //this.http.post(endpoint, selectedFile).subscribe
    (res => 
    {

   })
  }
  
  onSubmit() {
   
    const params = {
      'RowID': this.MRowid,
      'SchoolID': 1,      
      'Announcementdate': this.datepipe.transform(this.date,'yyyy-MM-dd'),     
      'AnnouncementTag':this.Topic, 
      'Announcement': this.Announcement,
      'Announcementfilename': "Education.pdf",
      'Flag' : true

    };
    console.log(params);
    this.restApiService.post(PathConstants.Announcement_Post, params).subscribe(res => {
      console.log('rs', res);
    });
  }
  onView() {
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Announcement_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });

  }
  clear() {
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
