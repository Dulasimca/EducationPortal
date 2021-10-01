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
  constructor(private restApiService: RestAPIService) { }

  initializeMaster() {
    this.restApiService.get(PathConstants.Master_Get).subscribe(res => {
      this.data = res;
    });
    this.restApiService.get(PathConstants.AccountingYear).subscribe(res => {
      this.accountingData = res;
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
          this.masterData.push({ name: c.Classname1, code: c.Classcode, roman: c.Classname2 });
        })
        break;
      case 'S':
        this.data.Table4.forEach(s => {
          this.masterData.push({ name: s.SectionName, code: s.Sectioncode });
        });
        break;
      case 'CS':
        this.masterData = [
          { label: '-select-', value: null },
          { label: 'MBC', value: 'MBC' },
          { label: 'BC', value: 'BC' },
          { label: 'OC', value: 'OC' },
          { label: 'SC/ST', value: 'SC' },
        ];
        break;
      case 'ST':
        this.masterData = [
          { label: '-select-', value: null },
          { label: 'Tamilnadu', value: 'Tamilnadu' },
        ];
        break;
      case 'N':
        this.masterData = [
          { label: '-select-', value: null },
          { label: 'Indian', value: 'Indian' },
          { label: 'NRI', value: 'NRI' },
          { label: 'Indian', value: 'Indian' },
        ];
        break;
      case 'G':
        this.masterData = [
          { label: '-select-', value: null },
          { label: 'Female', value: 'Female' },
          { label: 'Male', value: 'Male' },
          { label: 'Transgender', value: 'Transgender' },
        ];
        break;
      case 'M':
        this.masterData = [
          { label: '-select-', value: null },
          { label: 'Tamil', value: '1' },
          { label: 'English', value: '2' }
        ];
        break;
        case 'RL':
          this.masterData = [
          { label: '-select-', value: null },
          { label: 'Christian', value: 'Christian' },
          { label: 'Hindu', value: 'Hindu' },
          { label: 'Muslim', value: 'Muslim' },
          { label: 'Others', value: 'Others' },
          ];
          break;
          case 'B':
            this.masterData = [
              { label: '-select-', value: null },
              { label: 'A+', value: 'A+' },
              { label: 'A-', value: 'A-' },
              { label: 'AB+', value: 'AB+' },
              { label: 'AB-', value: 'AB-' },
              { label: 'B+', value: 'B+' },
              { label: 'B-', value: 'B-' },
              { label: 'O+', value: 'O+' },
              { label: 'O-', value: 'O-' },
            ];
            break;

    }
    return this.masterData;
  }

  getAccountingYear() {
    return this.accountingData;
  }

}