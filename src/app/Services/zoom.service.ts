import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { AuthService } from './auth.service';
import { User } from '../Interfaces/user';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Injectable({
    providedIn: 'root'
  })
  
  export class ZoomService {
    signatureEndpoint = 'http://localhost:4000';
    public signatureConfig: any;
    public meetingConfig: any;
   // apiKey = '0AeXbzH4QS2JC0vnzsuXyA';
   apiKey = 'lJXDJ2_mTtWmDHEMAtpW0A';
    meetingNumber;
    role;
    leaveUrl = 'http://localhost:4200/dashboard';
    userEmail;
    passWord;
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  //  registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjBBZVhiekg0UVMySkMwdm56c3VYeUEiLCJleHAiOjE2MzE2MDk4MTcsImlhdCI6MTYzMTYwNDQxN30.aV9M6ddHQZuvN1KMu5_u0r7Haw4uy_HxtRrBfGcorPU';
    registrantToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtTW9pRG43aFJfS2JPNklDQkVkLUVRIn0.7Rh3BrAYrkvPmpBfeD5TptWQwMZQRjLz1GqHgdYJvR8';
    login_user: User;

    constructor(public httpClient: HttpClient, private http: HttpClient,
        @Inject(DOCUMENT) document, private authService: AuthService) {
        this.login_user = this.authService.UserInfo;
        this.role = (this.login_user.roleId === 5) ? 1 : 0;
    }

    // getZoomUSers() {
    //     const URL = 'https://api.zoom.us/v2/users/';
    //     var options = {
    //         headers: {
    //             authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjBBZVhiekg0UVMySkMwdm56c3VYeUEiLCJleHAiOjE2MzE2MDk4MTcsImlhdCI6MTYzMTYwNDQxN30.aV9M6ddHQZuvN1KMu5_u0r7Haw4uy_HxtRrBfGcorPU' 
    //         }
    //     };
    //     this.http.get(URL, options).subscribe((res: any) => {
    //         console.log('res', res);
    //     })
    // }

    setMeeting(data) {
      console.log('zser', data);
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
      console.log('num', this.MeetingNumber, this.MeetingPassword, this.HostEmail
      , this.meetingNumber, this.passWord, this.userEmail);
        this.showZoomDiv();
        this.meetingConfig = {
          apiKey: this.apiKey,
        //  apiSecret: 'doJJkUQShBtsQqUerBfM0ecPaxmFng5qRoD3',
        apiSecret: '0yIoVcQKeQX0tG9hZt0qRo9rKXx2sqLeTWjW',
          meetingNumber: this.MeetingNumber,
          userName: this.login_user.username,
          passWord: this.MeetingPassword,
          leaveUrl: this.leaveUrl,
          role:  this.role
        };
        this.signatureConfig = ZoomMtg.generateSignature({
          meetingNumber: this.meetingConfig.meetingNumber,
          apiKey: this.meetingConfig.apiKey,
          apiSecret: this.meetingConfig.apiSecret,
          role: this.meetingConfig.role,
          success: res => {
            console.log(res.result);
          }
        });
        console.log('con', this.signatureConfig, this.meetingConfig);
        ZoomMtg.init({
          showMeetingHeader: false,
          disableInvite: true,
          disableCallOut: true,
          disableRecord: true,
          disableJoinAudio: true,
          audioPanelAlwaysOpen: true,
          showPureSharingContent: true,
          isSupportAV: true,
          isSupportChat: false,
          isSupportQA: false,
          isSupportCC: false,
          screenShare: true,
          rwcBackup: '',
          videoDrag: true,
          videoHeader: true,
          isLockBottom: false,
          isSupportNonverbal: false,
          isShowJoiningErrorDialog: false,
          leaveUrl: this.meetingConfig.leaveUrl,
          success: res => {
            ZoomMtg.join({
              meetingNumber: this.meetingConfig.meetingNumber,
              userName: this.meetingConfig.userName,
              signature: this.signatureConfig,
              apiKey: this.meetingConfig.apiKey,
              userEmail: this.userEmail,
              passWord: this.meetingConfig.passWord,
              success: res => {
                console.log('join meeting success');
              }, 
              error: res => {
                console.log('err', res);
              }
            });
          },
          error: res => {
            console.log('zoom err', res);
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