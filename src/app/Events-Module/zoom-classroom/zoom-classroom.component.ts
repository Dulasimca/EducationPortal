import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zoom-classroom',
  templateUrl: './zoom-classroom.component.html',
  styleUrls: ['./zoom-classroom.component.css']
})
export class ZoomClassroomComponent implements OnInit, AfterViewInit {
  meetingId: any;
  meetingURL: string;
  @ViewChild('iframe') iframe: ElementRef;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('inisde zoom iframe');
    this.meetingURL = this.activatedRoute.snapshot.queryParamMap.get('url');
    this.meetingId = this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  ngAfterViewInit() {
    console.log('iframe afterviewinit', this.iframe);
    this.iframe.nativeElement.src = this.meetingURL;
  }

}
