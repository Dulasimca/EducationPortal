import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-myachievement-form',
  templateUrl: './myachievement-form.component.html',
  styleUrls: ['./myachievement-form.component.css']
})
export class MyachievementFormComponent implements OnInit {

  date: Date = new Date();
  Status: any;
  Place : any;
  Events: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient) { }

  ngOnInit(): void {
   

  }
  onSubmit() {
    const params = {    
      'RowId': 0,
      'SchoolId': 1,         
      'StudentId':1,
      'eventdate': this.date,    
      'EventDetailS':this.Events,
      'Place': this.Place,  
      'AchievementStatus':this.Status,
      'Flag': 1, 

    };
    this.restApiService.post(PathConstants.Myachievement_Post, params).subscribe(res => {
      console.log('rs', res);
    })
  }
}
