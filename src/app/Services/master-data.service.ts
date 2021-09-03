import { Injectable, OnInit } from '@angular/core';
import { PathConstants } from '../Common-Module/PathConstants';
import { RestAPIService } from './restAPI.service';

@Injectable({
  providedIn: 'root'
})

export class MasterService implements OnInit {
  masterData?: any = [];
  districtData?: any = [];
  constructor(private restApiService: RestAPIService) { }

  ngOnInit() {
    this.restApiService.get(PathConstants.Master_Get).subscribe(res => {
      this.masterData = res;
      console.log('res', this.masterData);
    })
  }
  getMaster(type): any {
    var data: any = [];
    this.restApiService.get(PathConstants.Master_Get).subscribe(res => {
      data = res;
      console.log('res', this.masterData);
    switch (type) {
      case 'R':
        this.masterData = data.Table;
        break;
      case 'U':
       this.masterData = data.Table1;
       break;
      case 'D':
        this.masterData = data.Table2;
        break;
      case 'C':
        this.masterData = data.Table3;
        break;
      case 'S':
        this.masterData = data.Table4;
        break;
    }
    return this.masterData;
  })
  }

}