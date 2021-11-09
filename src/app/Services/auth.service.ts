import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedIn: boolean = false;
  getUserInfo: any;
  private loggedIn = new BehaviorSubject<boolean>(false); 
  private sessionExpired = new BehaviorSubject<boolean>(false); 
  /// To control if the user is logged in or not
  /// The BehaviorSubject keeps the latest value cached (in our case when the service is created the initial value is going to be false). 
  /// So when an Observer subscribes to the isLoggedIn(), the cached valued is going to be emitted right away.

  constructor(private router: Router) { 
    JSON.stringify(localStorage.setItem('LOG', 'false'));
    const user = localStorage.getItem('UserInfo');
    if(user !== null) {
      this.sessionExpired.next(true);
    } else {
      this.sessionExpired.next(false);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // getter to expose only the get method publicly and as also expose the Subject as an Observable
  }

  get isSessionExpired() {
    return this.sessionExpired.asObservable();
  }

  login(user: User){
    if (user.username !== '' && user.password !== '' ) { 
      localStorage.setItem('UserInfo', JSON.stringify(user));
      this.sessionExpired.next(true);
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }
  }

  checkStatus() {
    if (localStorage.getItem('UserInfo')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  setUserChecked($event) {
    localStorage.setItem('RememberUser', JSON.stringify($event));
  }

  get UserChecked() {
    return JSON.parse(localStorage.getItem('RememberUser'));
  }

  get UserInfo() {
    return JSON.parse(localStorage.getItem('UserInfo'));
  }

  public logout() {
    localStorage.removeItem('UserInfo');
    this.loggedIn.next(false);
    this.sessionExpired.next(false);
    this.router.navigate(['/login']);
  }
  
}
