import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './Services/auth.service';
import { RestAPIService } from './Services/restAPI.service';
import { User } from './Interfaces/user';
import { PathConstants } from './Common-Module/PathConstants';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'education-portal';
  events: string[] = [];
  opened: boolean = false;
  items: MenuItem[] = [];
  showContainer = true;
  mode: MatDrawerMode = 'side';
  hideHeader: boolean;
  loggedinTime: Date = new Date();
  loading: boolean;
  userName: string;
  userImage: string;
  showIcon: boolean;
  roleId: any;
  userClass: string;
  schoolName: string;
  @ViewChild('sidenav') _matSideNavPanel!: MatSidenav;
  @ViewChild('op', { static: false }) _panel: OverlayPanel;
  constructor(_breakpointObserver: BreakpointObserver,
    private _authService: AuthService, private _restApiService: RestAPIService) {
      _breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.opened = false;
        this.mode = 'over';
        this._matSideNavPanel.mode = 'over';
        console.log('mob', this.mode);
      } else {
        this.mode = 'side';
        this._matSideNavPanel.mode = 'side';
        this.opened = true;
        console.log('web', this.mode);
      }
    });
  }

  ngOnInit(): void {
    const log = this._authService.isSessionExpired;
    log.subscribe(val => {
      if (val) {
        const user: User = this._authService.UserInfo;
        this.roleId = Number.parseInt(user.roleId);
        this._restApiService.getByParameters(PathConstants.Menu_Master, { 'roleId': this.roleId }).subscribe(response => {
          this.userName = (user !== null && user !== undefined) ? user.username : '';
          this.userClass = (user !== null && user !== undefined) ? user.classRoman + ' - ' + user.section : '';
          this.schoolName = (user !== null && user !== undefined) ? user.schoolname + ' - ' + user.taluk : '';
          this.items = response.slice(0);
          this.checkChildItems(response);
          this.userImage = (user.studentImg.trim() !== '') ? user.studentImg : 'assets/layout/images/user-o-2x.png';
          this.showIcon = (user.studentImg.trim() !== '') ? true : false;
          this.loading = val;
          if (document.getElementById('login-page')) {
            document.getElementById('login-page').style.display = 'none';
          }
        })
      } else {
        const user: User = this._authService.UserInfo;
        this.loading = val;
        if (document.getElementById('login-page')) {
          document.getElementById('login-page').style.display = 'flex';
        }
      }
    })
  }
  checkChildItems(data: any) {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].items.length !== 0) {
          //  continue;
          this.checkChildItems(data[i].items);
        } else {
          delete data[i].items;
        }
      }
    }
  }

  onLogout() {
    this._authService.logout();
  }
}