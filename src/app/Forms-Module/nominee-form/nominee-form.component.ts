import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { MessageService} from 'primeng/api';
import { MasterService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {

  date: Date = new Date();
  Classname: string;
  section: string;
  name: string;
  positionOptions:SelectItem[];
  classOptions:SelectItem[];
  nameOptions:SelectItem[];
  sectionOptions:SelectItem[];
  districtOptions: SelectItem[];
  position: string;
  class?: any;
  masterData?: any = [];
  data?: any = [];

  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private messageService: MessageService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.class = this.masterService.getMaster('D');

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
  onSelect(type) {
    let classOptions = [];
    switch (type) {
      case 'C':
        this.data.Table3.forEach(c => {
          this.masterData.push({ name: c.Classname1, code: c.Classcode });
        })
        break;

}
  }
}
