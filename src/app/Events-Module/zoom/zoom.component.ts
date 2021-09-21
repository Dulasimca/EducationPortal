import { Component, OnInit } from '@angular/core';
import { ZoomService } from 'src/app/Services/zoom.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  constructor(private zoomService: ZoomService) { }

  ngOnInit(): void {
  }

  onJoin() {
    this.zoomService.setConfig();
  }

}
