import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { MasterService } from '../Services/master-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private masterService: MasterService) { }
  username: string = 'arun';
  password: string = '1233';
  id: number;
  showPswd: boolean;
  ngOnInit() {
    
  }

  onSignIn() {
    const obj: User = {
      'username': this.username,
      'password': this.password,
      'id': 1
    }
    this.authService.login(obj);
    this.masterService.initializeMaster();
    // this.router.navigate(['/dashboard']);
  }

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if(inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }

}
