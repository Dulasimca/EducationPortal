import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.data = [ {'slno': 1,'create': '20-08-2021', 'subject': 'Science', 'date': '30-08-2021', 'work': 'Plant Anatomy, Animal Husbandry, Quantum Physics, Acids & Bases unit ', 'type': 'Class Work'},
    {'slno': 2, 'create': '28-08-2021','subject': 'English', 'date': '03-09-2021', 'work': 'Grammatical Part & Essay Part', 'type': 'Home Work'},
    {'slno': 3, 'create': '5-09-2021','subject': 'Maths', 'date': '10-09-2021', 'work': 'Algebra unit', 'type': 'Notes' },
    {'slno': 4, 'create': '6-09-2021', 'subject': 'Tamil', 'date': '12-09-2021', 'work': 'Ilakkanam topic', 'type': 'Home test' },
    {'slno': 5, 'create': '12-09-2021','subject': 'Social Science', 'date': '14-09-2021', 'work': 'History of Aryans, Geology topics.', 'type': 'Home Work' }]
  }



}
