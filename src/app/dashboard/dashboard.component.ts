import { DatePipe, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ResponseMessage } from '../Common-Module/Message';
import { StyleSetting } from '../Helper-Module/style-setting';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { MasterService } from '../Services/master-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greetingMsg: string;
  userName: string;
  user_info: User;
   roleId : number;
  constructor(private datePipe: DatePipe, private authService: AuthService, 
    private locationStrategy: LocationStrategy, private _masterService: MasterService) { }

  ngOnInit() {
    this.preventBackButton();
    var _setlayout = new StyleSetting();
    _setlayout.setMainLayout();
    this.user_info = this.authService.UserInfo;
    this.roleId = this.user_info.roleId;
    const current_time = new Date().getTime();
    let get_hour: any = this.datePipe.transform(current_time, 'HH');
    get_hour = (get_hour * 1);
    this.greetingMsg = (get_hour < 12) ? ResponseMessage.GreetingMsgI : ((get_hour >= 12 && get_hour <= 16) ? ResponseMessage.GreetingMsgII 
    : ResponseMessage.GreetingMsgIII);
    this.userName = this.user_info.username + ' ' + this.user_info.lastname;
    this._masterService.getMaster('');
    this._masterService.getAccountingYear();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }


}
