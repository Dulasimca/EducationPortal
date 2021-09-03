import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greetingMsg: string;
  
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    const current_time = new Date().getTime();
    let get_hour: any = this.datePipe.transform(current_time, 'HH');
    get_hour = (get_hour * 1);
    this.greetingMsg = (get_hour < 12) ? 'Good Morning !' : ((get_hour >= 12 && get_hour <= 16) ? 'Good Afternoon !' : 'Good Evening !');
  }

}
