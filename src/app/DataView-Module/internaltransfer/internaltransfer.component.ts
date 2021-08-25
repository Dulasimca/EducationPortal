import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internaltransfer',
  templateUrl: './internaltransfer.component.html',
  styleUrls: ['./internaltransfer.component.css']
})
export class InternaltransferComponent implements OnInit {
  date: Date = new Date();
  district : any = []
  school : any = []
  display: boolean = false;
  selectedDistrict: any;
  selectedSchool: any;
  
  constructor() { }

  ngOnInit() {
    this.district = [ 
      { name: 'CUDDALORE'},
      { name: 'TRICHY'},
      { name: 'CHENNAI'},
       { name: 'COIMBATORE'},
       { name: 'VELLORE'},
       { name: 'SALEM'},
       { name: 'VILLUPURAM'},
       { name: 'MADURAI'},

    ]

    this.school = [
      {name : 'Government Model Higher Seconday School, Saidapet'},
      {name : 'Akshaya Vidyalaya Higher Seconday School, Cuddalore'},
      {name : 'Government Higher Seconday School, Trichy'},
      {name : 'Shiksha Higher Seconday School, Coimbatore'},
      {name : 'Brindavan Vidyalaya Higher Seconday School, Villupuram'},
      {name : 'Government Higher Seconday School, Madurai'},
      {name : 'Government Girls Higher Seconday School, Vellore'}
    ]
  }

  onTransfer() {
          this.display = true;
  }
}
