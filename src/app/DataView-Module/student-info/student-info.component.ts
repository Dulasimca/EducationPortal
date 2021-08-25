import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  activeIndex: any = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        const value: string = e.url.toString();
        const startIndex = (value.length - 1);
        let index: any = value.slice(startIndex, value.length);
        console.log('index', index);
        index = (index * 1);
        this.activeIndex = index;
      }
    });
  }

}
