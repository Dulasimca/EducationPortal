import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService) { }
  username: string;
  password: string;
  id: number;
  ngOnInit() {
    
  }

  onSignIn() {
    this.restApiService.getByParameters(PathConstants.Registration_Get, new HttpParams().set('type',2)).subscribe(response => {
      if(response !== undefined && response !== null) {
        response.forEach(i => {
          if(i.EmailId === this.username.trim() && i.password === this.password.trim()) {
            const obj: User = {
              'username': this.username.trim(),
              'password': this.password.trim(),
              'id': i.slno
            }
            this.authService.login(obj);
          } else {
            this.messageService.clear();
            this.messageService.add()
          }
        })
      }
    })
   }

}
