import { DatePipe, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResponseMessage } from '../Common-Module/Message';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greetingMsg: string;
  userName: string;
  user_info: User;
  
  constructor(private datePipe: DatePipe, private authService: AuthService, 
    private locationStrategy: LocationStrategy) { }

  ngOnInit() {
    this.preventBackButton();
    this.user_info = this.authService.UserInfo;
    const current_time = new Date().getTime();
    let get_hour: any = this.datePipe.transform(current_time, 'HH');
    get_hour = (get_hour * 1);
    this.greetingMsg = (get_hour < 12) ? ResponseMessage.GreetingMsgI : ((get_hour >= 12 && get_hour <= 16) ? ResponseMessage.GreetingMsgII 
    : ResponseMessage.GreetingMsgIII);
    this.userName = this.user_info.username + ' ' + this.user_info.lastname;
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }


}
