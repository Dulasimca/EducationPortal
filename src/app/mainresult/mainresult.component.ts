import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainresult',
  templateUrl: './mainresult.component.html',
  styleUrls: ['./mainresult.component.css']
})
export class MainresultComponent implements OnInit {
  years: year[];
  selectedyear: year;
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.years = [
      {name: '2020-2021', code: '2021'},
      {name: '2021-2022', code: '2122'},
       ];
    this.data = [ {'slno': 1, 'subject': 'Tamil', 'maximum':'100','taken':'95','pass':'pass' },
    {'slno': 2, 'subject': 'English', 'maximum':'100','taken':'60','pass':'pass' },
    {'slno': 3, 'subject': 'Maths', 'maximum':'100','taken':'75','pass':'pass' },
    {'slno': 4, 'subject': 'Science', 'maximum':'100','taken':'55','pass':'pass' },
    {'slno': 5, 'subject': 'Social Science', 'maximum':'100','taken':'80','pass':'pass' },
    ]
  }
}

interface year {
  name: string,
  code: string
}

