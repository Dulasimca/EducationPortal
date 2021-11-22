import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  date: Date;
  monthyear: string;
  selectedMonth: string;
  selectedyear: string;
  myAttData = [];
  currMonth: string;
  currMonthNo: number;
  prevMonth: string;
  prevMonthNo: number;
  nextMonth: string;
  currYear: string;
  constructor() { }

  ngOnInit() {
    var pDate = new Date().getFullYear() + '-' + (new Date().getMonth()-2) + '-01';
    var cDate = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-01';
    var nDate = new Date().getFullYear() + '-' + (new Date().getMonth()+2) + '-01';
    this.prevMonth = new Date(pDate).toLocaleString('default', { month: 'short' });
    this.currMonth = new Date(cDate).toLocaleString('default', { month: 'short' });
    this.nextMonth = new Date(nDate).toLocaleString('default', { month: 'short' });
    this.prevMonthNo = new Date().getMonth() - 2;
    this.currMonthNo = new Date().getMonth() - 1;
    this.currYear = new Date().getFullYear().toString();
    this.onCurrent();
  }

  onCurrent() {
    this.monthyear = this.currMonth + ' ' + this.currYear;
    this.selectedMonth = this.currMonth;
    this.selectedyear = this.currYear;
    this.myAttData = [
      {
        "year": this.currYear,
        "month": this.currMonth,
        "data": [
          {
            "date": 1,
            "status": "woff"
          },
          {
            "date": 2,
            "status": "abscent"
          },
          {
            "date": 3,
            "status": "present"
          },
          {
            "date": 4,
            "status": "present"
          },
          {
            "date": 5,
            "status": "present"
          },
          {
            "date": 6,
            "status": "present"
          },
          {
            "date": 7,
            "status": "woff"
          },
          {
            "date": 8,
            "status": "woff"
          },
          {
            "date": 9,
            "status": "present"
          },
          {
            "date": 10,
            "status": "present"
          },
          {
            "date": 11,
            "status": "present"
          },
          {
            "date": 12,
            "status": "req"
          },
          {
            "date": 13,
            "status": "req"
          },
          {
            "date": 14,
            "status": "req"
          },
          {
            "date": 15,
            "status": "req"
          },
          {
            "date": 16,
            "status": "req"
          },
        ]
      }
    ];
  }

  onPrev() {
     if (this.monthyear === (this.currMonth + ' ' + this.currYear) || 
     this.monthyear === (this.prevMonth + ' ' + this.currYear)) {
      this.monthyear = this.prevMonth + ' ' + this.currYear;
      this.selectedMonth = this.prevMonth;
      this.selectedyear = this.currYear;
      this.myAttData = [
        {
          "year": this.currYear,
          "month": this.prevMonth,
          "data": [
            {
              "date": 1,
              "status": "present"
            },
            {
              "date": 2,
              "status": "present"
            },
            {
              "date": 3,
              "status": "woff"
            },
            {
              "date": 4,
              "status": "woff"
            },
            {
              "date": 5,
              "status": "present"
            },
            {
              "date": 6,
              "status": "present"
            },
            {
              "date": 7,
              "status": "abscent"
            },
            {
              "date": 8,
              "status": "abscent"
            },
            {
              "date": 9,
              "status": "present"
            },
            {
              "date": 10,
              "status": "woff"
            },
            {
              "date": 11,
              "status": "woff"
            },
            {
              "date": 12,
              "status": "present"
            },
            {
              "date": 13,
              "status": "present"
            },
            {
              "date": 14,
              "status": "present"
            },
            {
              "date": 15,
              "status": "present"
            },
            {
              "date": 16,
              "status": "present"
            },
            {
              "date": 17,
              "status": "woff"
            },
            {
              "date": 18,
              "status": "woff"
            },
            {
              "date": 19,
              "status": "abscent"
            },
            {
              "date": 20,
              "status": "abscent"
            },
            {
              "date": 21,
              "status": "present"
            },
            {
              "date": 22,
              "status": "present"
            },
            {
              "date": 23,
              "status": "present"
            },
            {
              "date": 24,
              "status": "woff"
            },
            {
              "date": 25,
              "status": "woff"
            },
            {
              "date": 26,
              "status": "present"
            },
            {
              "date": 27,
              "status": "present"
            },
            {
              "date": 28,
              "status": "present"
            },
            {
              "date": 29,
              "status": "present"
            },
            {
              "date": 30,
              "status": "present"
            },
            {
              "date": 31,
              "status": "woff"
            },
          ]
        }]
    } else if (this.monthyear === (this.nextMonth + ' ' + this.currYear)) {
      this.onCurrent();
    }
  }

  onNext() {
    if (this.monthyear === (this.currMonth + ' ' + this.currYear)) {
      this.monthyear = this.nextMonth + ' ' + this.currYear;
      this.selectedMonth = this.nextMonth;
      this.selectedyear = this.currYear;
    } else if (this.monthyear === ( this.prevMonth + ' ' + this.currYear)) {
      this.onCurrent();
    }
  }

}
