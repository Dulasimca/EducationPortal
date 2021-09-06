import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {
  Classname: string;
  section: string;
  name: string;
  positionOptions:SelectItem[];
  position: string;

  constructor() { }

  ngOnInit(): void {
    this.positionOptions = [
      { label: 'Class Representative', value: 'C'},
      { label: 'School Representative', value: 'S'},
    ];
  }
  
  onSubmit() {
   
    const params = {
      'RowID': 0,
      'SchoolID': 1,        
      'ElectionID':1, // (this._guardianimg !== undefined && this._guardianimg !== null) ? this._guardianimg.values: 0,
      'NomineeID': 1,
      'ElectionName': this.name,
      'ElectionDate': '01-01-2001',
      'Flag' : true

    };
    console.log(params);
    //this.restApiService.post(PathConstants.Announcement_Post, params).subscribe(res => {
     // console.log('rs', res);
   // });
  }

}
