import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, of } from 'rxjs';
import { PathConstants } from './Common-Module/PathConstants';
import { User } from './Interfaces/user';
import { LoginComponent } from './login/login.component';
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
  hideHeader: boolean;
  schoolName: string;
  showIcon: boolean;
  userClass: string;
  roleId: any;
  openSideOverlay: boolean;
  @ViewChild('op', { static: false }) _panel: OverlayPanel;

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private _router: Router) { }

  ngOnInit() {
    this.clear();
    this.checkCurrentPage();
    const log = this.authService.isSessionExpired;
    log.subscribe(val => {
      if (val) {
        const user: User = this.authService.UserInfo;
        this.roleId = Number.parseInt(user.roleId);
        this.restApiService.getByParameters(PathConstants.Menu_Master, { 'roleId': this.roleId }).subscribe(response => {
          this.userName = (user !== null && user !== undefined) ? user.username : '';
          this.userClass = (user !== null && user !== undefined) ? user.classRoman + ' - ' + user.section : '';
          this.schoolName = (user !== null && user !== undefined) ? user.schoolname + ' - ' + user.taluk : '';
          this.items = response.slice(0);
          this.checkChildItems(response);
          this.getUrl().subscribe((res: Routes) => {
            console.log('auth res', res);
            // this._router.dispose();
            // this._router.resetConfig(res);
          })
          this.userImage = (user.studentImg.trim() !== '') ? user.studentImg : 'assets/layout/images/user-o-2x.png';
          this.showIcon = (user.studentImg.trim() !== '') ? true : false;
          this.loading = val;
          if (document.getElementById('login-page')) {
            document.getElementById('login-page').style.display = 'none';
          }
        })
      } else {
        const user: User = this.authService.UserInfo;
        this.loading = val;
        this.clear();
        if (document.getElementById('login-page')) {
          document.getElementById('login-page').style.display = 'flex';
        }
      }
    })
    this.authService.checkStatus();
  }

  getUrl(): Observable<Routes> {
    var config = this._router.config;
    var setConfig = [];
    config.forEach(c => {
      this.items.forEach(i => {
        var r_link: string = i.routerLink;
        var path = r_link.substring(1);
        if (path !== '' && c.path === path) {
          setConfig.push(c);
        } else if (i.parentId === 0 && i.items !== undefined) {
          if (i.items.length > 0) {
            i.items.forEach(j => {
              var r_link_child: string = j.routerLink;
              var path_child = r_link_child.substring(1);
              if (c.path === path_child) {
                setConfig.push(c);
              }
            })
          }
        }
      })
    })
    setConfig.push({ path: '**', redirectTo: '/login', component: LoginComponent })
    setConfig.unshift({ path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent })
    console.log('secong', setConfig);
    return of(setConfig);
  }

  clear() {
    this.userClass = '';
    this.userImage = '';
    this.schoolName = '';
    this.userName = '';
    if (document.getElementById('login-page')) {
      document.getElementById('login-page').style.display = 'none';
    }
  }

  checkCurrentPage() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/') {
          this.hideHeader = true;
        } else {
        this.hideHeader = false;
        }
      }
    });
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
    this._panel.hide();
    this.authService.logout();
  }
}

