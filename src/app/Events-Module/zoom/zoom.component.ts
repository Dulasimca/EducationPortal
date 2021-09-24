import { Component, OnInit } from '@angular/core';
import { ZoomService } from 'src/app/Services/zoom.service';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  loggedIn_user: User;

  constructor(private zoomService: ZoomService, private authService: AuthService) { }

  ngOnInit(): void {
  //  this.loggedIn_user = this.authService.UserInfo;
    this.onJoin();
  }

  onJoin() {
    this.zoomService.setConfig();
  }

}
