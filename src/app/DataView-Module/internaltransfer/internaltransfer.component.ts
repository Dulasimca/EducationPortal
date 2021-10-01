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
  cities?: any;
  
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    
    this.districts = this.masterService.getMaster('D');

    this.school = [
      { label: '-select-', value: null },
      { label: 'Government higher Secondary School,Coimbatore', value: 'S01' },
      { label: 'Government Girls higher Secondary School,Madurai', value: 'S02' },
      { label: 'Adharsh Vidyalaya public school,Dindugal', value: 'S03' },
      { label: 'Artisto Public School,Cuddalore', value: 'S04' }
    ];
    this.talukOptions = [
      {label: '-select', value: null},
      {label: 'Chidambaram', value: 'T01'},
      {label: 'Ambattur', value: 'T02'},
      {label: 'Vellore', value: 'T03'},

    ]
  }

  onSelect(type) {
    let districtSelection = [];
    switch (type) {
      case 'D':
        this.districts.forEach(d => {
          districtSelection.push({ label: d.name, value: d.code });
        })
        this.districtOptions = districtSelection;
        this.districtOptions.unshift({ label: '-select', value: null });
        break;
      }
  }

  onTransfer() {
          this.display = true;
  }
}
