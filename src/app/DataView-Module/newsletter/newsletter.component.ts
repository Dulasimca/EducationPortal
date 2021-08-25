import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  data : any = []
  
  constructor() { }
  
  ngOnInit() {
    this.data = [ 
      {'slno':'1', 'topic':'Student Handbook and Uniform Code'},
      {'slno':'2', 'topic':'Blood Donation Camp'},
      {'slno':'3', 'topic':'Rebel Sports Activities'},
      {'slno':'4', 'topic':'Be a volunteer!'},
      {'slno':'5', 'topic':'Library Etiquette and Manners'},
      {'slno':'6', 'topic':'Valuable principles that will make you treat people better'},
      {'slno':'7', 'topic':'Think Clean and Go Green!'},
    ]
  }
}
