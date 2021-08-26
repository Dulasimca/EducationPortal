import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  username: string = 'arun';
  password: string = '1233';
  id: number;
  ngOnInit() {
    
  }

  onSignIn() {
    const obj: User = {
      'username': this.username,
      'password': this.password,
      'id': 1
    }
    this.authService.login(obj);
    // this.router.navigate(['/dashboard']);
  }

}
