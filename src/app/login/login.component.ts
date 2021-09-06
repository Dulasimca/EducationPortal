import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from '../Common-Module/PathConstants';
import { User } from '../Interfaces/user';
import { AuthService } from '../Services/auth.service';
import { RestAPIService } from '../Services/restAPI.service';
import { MasterService } from '../Services/master-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private restApiService: RestAPIService,
    private messageService: MessageService, private masterService: MasterService) { }
  username: string;
  password: string;
  id: number;
  showPswd: boolean;
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
            this.masterService.initializeMaster();
          } else {
            this.messageService.clear();
            this.messageService.add()
          }
        })
      }
    })
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
