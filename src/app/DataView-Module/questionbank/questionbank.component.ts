import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css']
})
export class QuestionbankComponent implements OnInit {
  years: year[];
  selectedyear: year;
  data: any;
  link: any;
  
  constructor() { }

  ngOnInit() {
    this.years = [
      {name: '2020-2021', code: '2021'},
      {name: '2021-2022', code: '2122'},
       ];
    this.data = [ {'slno': 1, 'subject': 'Tamil-I','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },{'slno': 2, 'subject': 'Tamil-II','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },{'slno': 3, 'subject': 'English-I','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },
    {'slno': 4, 'subject': 'English-II','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },{'slno': 5, 'subject': 'Maths','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },
    {'slno': 6, 'subject': 'Science','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" },{'slno': 7, 'subject': 'Social Science','link': "./assests/questionbank/10th_TAMIL_PAPER_II.pdf" }
    ]
  }
}

interface year {
  name: string,
  code: string
}
