import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.data = [ {'slno': 1, 'event': 'Fine Arts Award', 'date': '03-08-2021', 'place': 'Inter-School', 'status': 'Artfully Creative Award' },
    {'slno': 2, 'event': 'Spell Bee', 'date': '08-08-2021', 'place': 'Regional', 'status': 'Excellence Award' },
    {'slno': 3, 'event': 'Chess competition', 'date': '10-08-2021', 'place': 'Tournament', 'status': 'Master Minds' },
    {'slno': 4, 'event': 'Mini Volleyball Championship', 'date': '10-08-2021', 'place': 'District-Level', 'status': 'Rising Champion Award' },
    {'slno': 5, 'event': 'Zonal Yoga Competition', 'date': '11-08-2021', 'place': 'Intra-School', 'status': 'Enthusiastic Learner Award' }]
  }
}