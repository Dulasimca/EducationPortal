import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit {
  data: any = [];
  
  constructor() { }

  ngOnInit() {
    this.data = [ {'slno': 1, 'subject': 'Smart Classroom', 'date': '01-08-2021', 'instructions': 'The smart class had been established by UIIC. The smart class would benefit students to learn latest technology.'},
    {'slno': 2, 'subject': 'COVID Vaccination', 'date': '08-09-2021', 'instructions': 'COVID-19 Vaccination for students, Lecturers and support staff of skill training. '},
    {'slno': 3, 'subject': 'Award Ceremony', 'date': '10-08-2021', 'instructions': 'Circular regarding date extension for "Best Student Award" programme.'},
    {'slno': 4, 'subject': 'Government order', 'date': '21-08-2021', 'instructions': 'Circular regarding not approving government school premises/land for any purposes.'},
    {'slno': 5, 'subject': 'Tuition Fee', 'date': '11-09-2021', 'instructions': 'Collection of Tution fees from the students studying in English Medium classes in Government/Government Aided High and Higher Secondary Schools orders issued.'}]
  }


}