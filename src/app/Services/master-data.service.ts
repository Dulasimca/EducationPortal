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
    });
  }

  getMaster(type): any {
    this.masterData = [];
    switch (type) {
      case 'R':
        this.data.Table.forEach(r => {
          this.masterData.push({ name: r.Name, code: r.RoleId, isActive: r.Flag });
        });
        break;
      case 'U':
        this.data.Table1.forEach(u => {
          this.masterData.push({ name: u.CategoryName, code: u.Categorycode, isActive: u.Flag });
        });
        break;
      case 'D':
        this.data.Table2.forEach(d => {
          this.masterData.push({ name: d.Districname, code: d.Districcode, isActive: d.Flag });
        })
        break;
      case 'C':
        this.data.Table3.forEach(c => {
          this.masterData.push({ name: c.Classname1, code: c.Classcode });
        })
        break;
      case 'S':
        this.data.Table4.forEach(s => {
          this.masterData.push({ name: s.SectionName, code: s.Sectioncode });
        });
        break;
    }
    return this.masterData;
  }

}