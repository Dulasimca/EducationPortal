import { Injectable } from '@angular/core';
import { Profile } from '../Interfaces/profile';

@Injectable({
    providedIn: 'root'
  })
  
  export class UserService {
    response_data?: Profile;

    setResponse(data) {
        this.response_data = data;
    }

    getResponse(): any {
        return this.response_data;
    }
  }