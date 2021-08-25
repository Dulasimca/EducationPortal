import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books : any = []
  constructor() { }

  ngOnInit() {
    this.books = [
      {'no' : '1', 'author': 'Prof. V.Manikavasagam', 'subjects' : 'Tamil'},
      {'no' : '2', 'author': 'Prof. A.George Aromal', 'subjects' : 'English'},
      {'no' : '3', 'author':  'Prof. D.Edwin', 'subjects' : 'Maths'},
      {'no' : '4', 'author': 'Dr. S.A.Rajkumar', 'subjects' : 'Science'},
      {'no' : '5', 'author': 'Prof. J.Augustus', 'subjects' : 'Social Science'}
    ]
  }
}
