import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { AuthService } from './auth.service';
import { User } from '../Interfaces/user';
import { Router } from '@angular/router';
import { Meeting } from '../Interfaces/meeting';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Injectable({
  providedIn: 'root'
})

export class ZoomService {
  public signatureConfig: any;
  public meetingConfig: any;
  signatureEndpoint: string;;
  apiKey: string;;
  meetingNumber: string;;
  role: string;
  leaveUrl: string;
  userName: string;
  userEmail: string
  passWord: string;
  apiSecret: string;
  registrantToken: string;
  login_user: User;

  constructor(public httpClient: HttpClient, private router: Router,
    @Inject(DOCUMENT) document, private authService: AuthService) {
    this.login_user = this.authService.UserInfo;
  }

  setMeeting(data) {
    var settings: Meeting = data;
    this.meetingNumber = settings.meetingNumber;
    this.passWord = settings.passWord;
    this.userEmail = settings.userEmail;
    this.userName = settings.userName;
    this.role = settings.role;
    this.registrantToken = settings.registrantToken;
    this.signatureEndpoint = settings.signatureEndpoint;
    this.apiKey = settings.apiKey;
    this.apiSecret = settings.apiSecret;
    this.leaveUrl = settings.leaveUrl;
  }

  setConfig() {
    this.signatureEndpoint = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
      role: this.role,
      success: res => {
        console.log(res.result);
      }
    });
    console.log("signature Endpoint : " + this.signatureEndpoint);
    this.startMeeting(this.signatureEndpoint);
  }

  startMeeting(signature) {
    this.showZoomDiv();
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature:signature, 
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
         // tk: this.registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  showZoomDiv() {
    document.getElementById('zmmtg-root').style.display = 'block';
     document.getElementById('example-container').style.display = 'none';
    //document.getElementById('main-layout').className = 'layout-wrapper-initial'
     //document.getElementById('side-nav-bar').style.display = 'none';
    //document.getElementById('main-layout').className = 'layout-wrapper-initial';

//     <mat-sidenav-container class="example-container">
//     <mat-sidenav #sidenav [mode]="mode" [(opened)]="opened">
//         <p-panelMenu [model]="items" [style]="{'width':'180px', 'height': '90vh !important',
//         'background': 'white'}"></p-panelMenu>
//     </mat-sidenav>
//     <mat-sidenav-content>
//         <div #main_container style="height: 100vh;"
//         [ngStyle]="{'margin-bottom': (hideHeader ? '0' : '-5%')}">
//             <router-outlet></router-outlet>
//         </div>
//     </mat-sidenav-content>
// </mat-sidenav-container>    
  }
}