import { Injectable, OnInit } from '@angular/core';
import { PathConstants } from '../Common-Module/PathConstants';
import { RestAPIService } from './restAPI.service';

@Injectable({
  providedIn: 'root'
})

export class MasterService {
  masterData?: any = [];
  districtData?: any = [];
  data?: any = [];
  constructor(private restApiService: RestAPIService) { }

  initializeMaster() {
    this.restApiService.get(PathConstants.Master_Get).subscribe(res => {
      this.data = res;
      console.log('data', this.data);
    });
  }

  getMaster(type): any {
    this.masterData = [];
    switch (type) {
      case 'R':
        this.data.Table.forEach(r => {
          this.masterData.push({ name: r.Name, code: r.RoleId, isActive: r.Flag });
        });
        console.log('inside switch - r');
        console.log('d', this.masterData);
        break;
      case 'U':
        this.data.Table1.forEach(u => {
          this.masterData.push({ name: u.CategoryName, code: u.Categorycode, isActive: u.Flag });
        });
        console.log('inside switch - u');
        console.log('u', this.masterData);
        break;
      case 'D':
        this.data.Table2.forEach(d => {
          this.masterData.push({ name: d.Districname, code: d.Districcode, isActive: d.Flag });
        })
        console.log('inside switch - d');
        console.log('d', this.masterData);
        break;
      case 'C':
        this.data.Table3.forEach(c => {
          this.masterData.push({ name: c.Classname1, code: c.Classcode });
        })
        console.log('inside switch - c');
        console.log('c', this.masterData);
        break;
      case 'S':
        this.data.Table4.forEach(s => {
          this.masterData.push({ name: s.SectionName, code: s.Sectioncode });
        });
        console.log('inside switch - s');
        console.log('s', this.masterData);
        break;
    }
    return this.masterData;
  }

}