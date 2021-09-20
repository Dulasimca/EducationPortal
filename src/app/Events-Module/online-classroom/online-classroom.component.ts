import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-classroom',
  templateUrl: './online-classroom.component.html',
  styleUrls: ['./online-classroom.component.css']
})
export class OnlineClassroomComponent implements OnInit {
  date: Date = new Date();
  data: any = [];
  
  constructor(private router:Router) { }

  ngOnInit() {
    this.data = [ {'slno': 1, 'subject': 'Tamil', 'date': '03-08-2021', 'time': '8.30 AM', 'duration': '45 mins' },
    {'slno': 2, 'subject': 'English', 'date': '08-08-2021', 'time': '9.30 AM', 'duration': '45 mins' },
    {'slno': 3, 'subject': 'Maths', 'date': '10-08-2021', 'time': '10.30 AM', 'duration': '45 mins' },
    {'slno': 4, 'subject': 'Science', 'date': '10-08-2021', 'time': '11.30 AM', 'duration': '45 mins' },
    {'slno': 5, 'subject': 'Social Science', 'date': '11-08-2021', 'time': '1.30 AM', 'duration': '45 mins' }]
  }

  onJoinClassroom(data) {
    this.router.navigate(['/online-classroom-join']);
  }
}
