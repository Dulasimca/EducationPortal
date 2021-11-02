import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes } from '@angular/router';
import { User } from '../Interfaces/user';
import { AuthService } from './auth.service';
import { RestAPIService } from './restAPI.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  items: any = [];
  constructor(private _authService: AuthService, private _router: Router) { 
      this.user = this._authService.UserInfo;
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const checkSession = this._authService.isSessionExpired;
    if (checkSession) {
      return true;
    } else {
      this._router.navigate(['/login']);
  }
}

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
