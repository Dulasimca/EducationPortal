import { Injectable, OnInit } from '@angular/core';
import { PathConstants } from '../Common-Module/PathConstants';
import { RestAPIService } from './restAPI.service';

@Injectable({
  providedIn: 'root'
})

export class MasterService {
  masterData?: any = [];
  accountingData?: any = [];
  data?: any = [];
  constructor(private restApiService: RestAPIService) {
    this.restApiService.get(PathConstants.Master_Get).subscribe(res => {
      this.data = res;
    });
    this.restApiService.get(PathConstants.AccountingYear).subscribe(res => {
      this.accountingData = res;
    });
  }

  // initializeMaster() {


  // }

  getMaster(type): any {
    this.masterData = [];
    switch (type) {
      //religion
      case 'R':
        this.data.Table.forEach(r => {
          this.masterData.push({ name: r.Name, code: r.RoleId, isActive: r.Flag });
        });
        break;
      //category
      case 'U':
        this.data.Table1.forEach(u => {
          this.masterData.push({ name: u.CategoryName, code: u.Categorycode, isActive: u.Flag });
        });
        break;
      //district
      case 'D':
        this.data.Table2.forEach(d => {
          this.masterData.push({ name: d.Districname, code: d.Districcode, isActive: d.Flag });
        })
        break;
      //class
      case 'C':
        this.data.Table3.forEach(c => {
          this.masterData.push({ name: c.Classname1, code: c.Classcode, roman: c.Classname2 });
        })
        break;
      //section
      case 'S':
        this.data.Table4.forEach(s => {
          this.masterData.push({ name: s.SectionName, code: s.Sectioncode });
        });
        break;
      // blood group
      case 'B':
        this.data.Table5.forEach(b => {
          this.masterData.push({ name: b.Name, code: b.Id });
        });
        break;
      //caste
      case 'CS':
        this.data.Table6.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      // gender
      case 'G':
        this.data.Table7.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      //mother tongue
      case 'MT':
        this.data.Table8.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      //religion
      case 'RL':
        this.data.Table9.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      //nationality
      case 'N':
        this.data.Table10.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      //medium
      case 'M':
        this.data.Table11.forEach(c => {
          this.masterData.push({ name: c.Name, code: c.Id });
        });
        break;
      //taluk
      case 'T':
        this.data.Table12.forEach(t => {
          this.masterData.push({ name: t.Talukname, code: t.Talukid, dcode: t.Districcode });
        });
        break;
      //holiday type
      case 'HT':
        this.data.Table13.forEach(s => {
          this.masterData.push({ name: s.Name, code: s.Id });
        });
        break;
      //subject
      case 'SB':
        this.data.Table14.forEach(s => {
          this.masterData.push({ name: s.Name, code: s.Id, class: s.Classcode });
        });
        break;
      //test
      case 'TS':
        this.data.Table15.forEach(t => {
          this.masterData.push({ name: t.Name, code: t.Id });
        });
        break;
        //ElectionName
        case 'EN':
          this.data.Table16.forEach(e => {
            this.masterData.push({ name: e.Name, code: e.Id });
          });
          break;
          //AssignmentType
          case 'AT':
            this.data.Table17.forEach(a => {
              this.masterData.push({ name: a.Name, code: a.Id});
            });
            break;
            //Curriculum
            case 'CL':
            this.data.Table18.forEach(c => {
              this.masterData.push({ name: c.Name, code: c.id });
            });
            break;
    }
    return this.masterData;
  }

  getAccountingYear() {
    return this.accountingData;
  }

}