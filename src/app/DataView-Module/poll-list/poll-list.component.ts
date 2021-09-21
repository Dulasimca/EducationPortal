import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {
  data: any = []; 
  cols: any;
  positionOptions: SelectItem[];
  selectedPosition: string;
  
  
  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit() { 
    this.positionOptions = [
      { label: '-select-', value: null },
      { label: 'Class Representative', value: '0'},
      { label: 'School Representative', value: '1'},
    ];

    this.cols = [
      { field: 'RowId', header: 'ID' },
      { field: 'NomineeID', header: 'NomineeID' },
      { field: 'FirstName', header: 'Nominee Name'}
      
    ];
    this.onView();
    }
  onView() {
    const params = {
      'SchoolID': 2,
    }
    this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });

  }
}
