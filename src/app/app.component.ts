import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'education-portal';
  items: any[];
  isOpen: boolean = false;
  isLoggedIn$: Observable<boolean>;
  isSignedIn: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    // this.isSignedIn = this.authService.checkLog;
    console.log('sign', this.isSignedIn, this.isLoggedIn$);
    this.items = [
      { label: 'Dashboard', icon: 'fa fa-desktop', routerLink: '/dashboard' },
      { label: 'Admin', icon: 'fa fa-user-secret', 
    items: [
      { label: 'Registration', icon: 'fa fa-registered', routerLink: '/registration' },
      { label: 'Announcement', icon: 'fa fa-bullhorn', routerLink: '/announcement'},
      { label: 'Assignment', icon:   'fa fa-pencil-square-o', routerLink: '/assignment'},
      { label: 'Holidays', icon: 'fa fa-calendar', routerLink: '/holidaydetails'},
      { label: 'Nominee', icon: 'fa fa-handshake-o', routerLink: '/nominee' }
      ]},
      { label: 'Profile', icon: 'fa fa-user-circle-o', 
      items: [
        { label: 'My Profile', icon: 'fa fa-address-card', routerLink: '/student-info' },
        { label: 'My Parent', icon: 'fa fa-users', routerLink: '/student-info' },
        { label: 'My Achievements', icon: 'fa fa-trophy', routerLink: '/myachievement' },
       // { label: 'My School', icon: 'fa fa-graduation-cap', },
      ] },
      {label: 'ID Card Info', icon: 'fa fa-id-badge', routerLink: '/profile' },
      { label: 'Vote', icon: 'fa fa-thumbs-up', 
      items: [
        { label: 'Vote', icon: 'fa fa-thumbs-o-up', routerLink: '/poll-list'},
        // { label: 'Nominee', icon: 'fa fa-handshake-o', routerLink: '/nominee'},
        //{ label: 'Vote Result', icon: 'fa fa-vacrd-o', routerLink: '/poll-list'}
      ] },
      {
        label: 'School', icon: 'fa fa-institution',
        items: [
          { label: 'Calendar', icon: 'fa fa-calendar', routerLink: '/events' },
          { label: 'Attendance', icon: 'fa fa-calendar-check-o', routerLink: '/attendance' },
          { label: 'Announcements', icon: 'fa fa-bullhorn', routerLink: '/announcements' },
          { label: 'Assignments', icon: 'fa fa-pencil-square-o', routerLink: '/assignments-information' },
          { label: 'Circulars', icon: 'fa fa-calendar-minus-o', routerLink: '/circulars' },
          { label: 'NewsLetter', icon: 'fa fa-envelope-open', routerLink: '/newsletters' },
        ]
      },
      { label: 'Question Bank', icon: 'fa fa-file-text-o', routerLink: '/question-bank' },
      { label: 'Online Classroom', icon: 'fa fa-file-video-o', routerLink: '/online-classroom' },
      { label: 'Online Assessment', icon: 'fa fa-object-group', 
      items: [
        { label: 'Online Assessment', icon: 'fa fa-laptop', routerLink: '/online-assessment' },
        { label: 'Class Test Result', icon: 'fa fa-list-alt', routerLink: '/subject-result' },
        { label: 'Assessment Result', icon: 'fa fa-file-text', routerLink: '/subject-test-result' },
      ] },
      { label: 'Book', icon: 'fa fa-book', routerLink: '/books' },
      { label: 'Results', icon: 'fa fa-file-text-o', routerLink: '/result' },
      { label: 'Gallery', icon: 'fa fa-picture-o', routerLink: '/gallery-list' },
      { label: 'Fee', icon: 'fa fa-money', routerLink: '/fees' },
      { label: 'Internal-School Transfer', icon: 'fa fa-exchange', routerLink: '/internal-transfer' },
      { label: 'Download Session', icon: 'fa fa-download', routerLink: '/classroom-download' },
      // { label: 'Online Test', icon: 'fa fa-download', routerLink: '/classroom-download' },

    ];  }

    onLogout(){
      this.authService.logout();                   
    }

}

