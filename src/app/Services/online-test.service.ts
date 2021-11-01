import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
  export class AssessmentService {
    response_data?: any;
    assessmentId: number;

    setId(id) {
      this.assessmentId = id;
    }

    getId() {
      return this.assessmentId;
    }

    setQuestions(data) {
        this.response_data = data;
    }

    getQuestions(): any {
      return this.response_data;
    }
  }