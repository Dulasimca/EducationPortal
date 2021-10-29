import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { AuthService } from './auth.service';
import { User } from '../Interfaces/user';
import { Router } from '@angular/router';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Injectable({
    providedIn: 'root'
  })
  
  export class ZoomService {
  //  signatureEndpoint = 'http://localhost:4000';
  signatureEndpoint = 'https://api.zoom.us/v2/users/dulasimca@gmail.com/meetings'

    public signatureConfig: any;
    public meetingConfig: any;
   // apiKey = '0AeXbzH4QS2JC0vnzsuXyA';
  //  apiKey = 's6QSieakRm6yOMJe78HwlA';
  apiKey = 'lJXDJ2_mTtWmDHEMAtpW0A'
  meetingNumber ='81109773373'
    role: string;
    leaveUrl = 'http://localhost:4200'
    userName = 'Angular'
    userEmail = 'dulasimca@gmail.com'
    passWord = 'T7FDXW' 
  apiSecret ='0yIoVcQKeQX0tG9hZt0qRo9rKXx2sqLeTWjW'
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  //  registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjBBZVhiekg0UVMySkMwdm56c3VYeUEiLCJleHAiOjE2MzE2MDk4MTcsImlhdCI6MTYzMTYwNDQxN30.aV9M6ddHQZuvN1KMu5_u0r7Haw4uy_HxtRrBfGcorPU';
    //registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtTW9pRG43aFJfS2JPNklDQkVkLUVRIn0.7Rh3BrAYrkvPmpBfeD5TptWQwMZQRjLz1GqHgdYJvR8';
   // registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaZ1ZpTTFCcFNrYXJkOUF0Yms3YjJRIn0.ycFCBSJVbtM1GfceRlry3Oq70sJexTntGKF5mBXgPRQ';
   registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InM2UVNpZWFrUm02eU9NSmU3OEh3bEEiLCJleHAiOjE2MzU5NDUyOTYsImlhdCI6MTYzNTM0MDQ5OH0.R-Bt3P8dPUxAgBaTc6dpSnnR9F2fzxyMAqW39ssMqNc'
    login_user: User;

    constructor(public httpClient: HttpClient, private router: Router,
        @Inject(DOCUMENT) document, private authService: AuthService) {
        this.login_user = this.authService.UserInfo;
      //  this.role = (this.login_user.roleId === 5) ? 1 : 0;
     //   this.leaveUrl = this.router.navigateByUrl('/online-classroom');
      //  this.showZoomDiv();
      this.role = '1';
    }

    setMeeting(data) {
      this.meetingNumber = data.MeetingId;
      this.passWord = data.Passcode;
      this.userEmail = (this.login_user.roleId === 5) ? '' : data.HostEmail;
    }

    get HostEmail() {
      return this.userEmail;
    }

    get MeetingNumber() {
      return this.meetingNumber;
    }

    get MeetingPassword() {
      return this.passWord;
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
      console.log("1",this.signatureEndpoint);
      this.startMeeting(this.signatureEndpoint);
      }

      startMeeting(signature) {

        console.log("Start Meetings",signature)
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
          document.getElementById('side-nav-bar').style.display = 'none';
          document.getElementById('main-layout').className = 'layout-wrapper-initial';
      }
    
    
        // getSignature() {
        //   this.httpClient.post(this.signatureEndpoint, {
        //     meetingNumber: this.meetingNumber,
        //     role: this.role
        //   }).toPromise().then((data: any) => {
        //     if(data.signature) {
        //       console.log(data.signature)
        //       this.startMeeting(data.signature)
        //     } else {
        //       console.log(data)
        //     }
        //   }).catch((error) => {
        //     console.log(error)
        //   })
        // }
  }