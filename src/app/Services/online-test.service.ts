import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
  export class AssessmentService {
    response_data?: any;

    setResponse(data) {
        this.response_data = data;
    }

    getResponse(): any {
        return this.response_data;
    }
  }