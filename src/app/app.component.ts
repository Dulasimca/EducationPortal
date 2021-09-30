import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable } from 'rxjs';
import { PathConstants } from './Common-Module/PathConstants';
import { User } from './Interfaces/user';
import { AuthService } from './Services/auth.service';
import { RestAPIService } from './Services/restAPI.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'education-portal';
  items: any[];
  isOpen: boolean = true;
  isLoggedIn$: Observable<boolean>;
  isSignedIn: boolean;
  userName: string;
  showPanel: boolean;
  loggedinTime: Date = new Date();
  userImage: string;
  loading: boolean;
  schoolName: string;
  showIcon: boolean;
  userClass: string;
  @ViewChild('op', { static: false }) _panel: OverlayPanel;

  constructor(private authService: AuthService, private restApiService: RestAPIService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(log => {
      if (!log) { this.loading = log; } else {
        const user: User = this.authService.UserInfo;
        this.restApiService.getByParameters(PathConstants.Menu_Master, { 'roleId': user.roleId }).subscribe(response => {
          this.loading = log;
          this.userName = (user !== null && user !== undefined) ? user.username : '';
          this.userClass = (user !== null && user !== undefined) ? user.classRoman + ' - ' + user.section : '';
          this.schoolName = (user !== null && user !== undefined) ? user.schoolname + ' - ' + user.taluk : '';
          this.items = response;
          this.items.forEach(i => {
            if (i.items.length === 0) {
              delete i.items;
            }
            if (i.label === 'Profile') {
              i.items.forEach(j => {
                if (j.routerLink === '/student-info') {
                  if (j.ID === 31) {
                    j.queryParams = { 'id': 0, 'si': true };
                  } else if (j.ID === 32) {
                    j.queryParams = { 'id': 1, 'si': true };
                  }
                }
              })
            }
          })
          this.userImage = (user.studentImg.trim() !== '') ? user.studentImg : 'assets/layout/images/user-o-2x.png';
          this.showIcon = (user.studentImg.trim() !== '') ? true : false;
        })
      }
    })

    this.authService.checkStatus();
  }

  onLogout() {
    this._panel.hide();
    this.authService.logout();
  }

}

