import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { MasterService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-internaltransfer',
  templateUrl: './internaltransfer.component.html',
  styleUrls: ['./internaltransfer.component.css']
})
export class InternaltransferComponent implements OnInit {
  date: Date = new Date();
  school : SelectItem[];
  display: boolean = false;
  district: string;
  taluk: string;
  selectedSchool: any;
  districtOptions: SelectItem[];
  talukOptions: SelectItem[];
// master
  districts?: any;
  taluks?: any;
  
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    

    this.school = [
      { label: '-select-', value: null },
      { label: 'Government higher Secondary School,Chennai', value: 'S01' },
      { label: 'Vidyalaya Public School,Royapuram', value: 'S02' },
      { label: 'Government higher Secondary School,Mylapore', value: 'S03' },
      { label: 'Government higher Secondary School,Perambur', value: 'S04' },
      { label: 'Government Girls higher Secondary School,Madurai', value: 'S05' },
      { label: 'Adharsh Vidyalaya public school,Dindugal', value: 'S06' },
      { label: 'Artisto Public School,Cuddalore', value: 'S07' }
    ];
    
  }

  onSelect(type) {
    this.districts = this.masterService.getMaster('D');
    this.taluks = this.masterService.getMaster('T');
    let districtSelection = [];
    let talukSelection = [];
    switch (type) {
      case 'D':
        this.districts.forEach(d => {
          districtSelection.push({ label: d.name, value: d.code });
        })
        this.districtOptions = districtSelection;
        this.districtOptions.unshift({ label: '-select', value: null });
        break;
        case 'T':
        this.taluks.forEach(d => {
          talukSelection.push({ label: d.name, value: d.code });
        })
        this.talukOptions = talukSelection;
        this.talukOptions.unshift({ label: '-select', value: null });
        break;
      }
  }

  onTransfer() {
          this.display = true;
  }
}
