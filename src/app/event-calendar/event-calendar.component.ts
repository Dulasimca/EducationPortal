import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   events: [],
  // };
  events: any[];
  options: any;
  header: any
  
  constructor() { }

  ngOnInit() {
   
    
    // this.eventService.getEvents().then(events => {
    //       this.events = events;
    //       this.options = {...this.options, ...{events: events}};
    //   });
    var events = [
      {
        "id": 1,
        "title": "Meeting",
        "start": "2021-08-02"
      },
      {
        "id": 2,
        "title": "Assessment",
        "start": "2021-08-09",
        "end": "2021-08-10"
      },
      {
        "id": 3,
        "title": "Conference",
        "start": "2021-08-25",
        "end": "2021-08-26"
      },
      {
        "id": 3,
        "title": "Seminar",
        "start": "2021-08-30",
        "end": "2021-08-31"
      },
      {
        "id": 5,
        "title": "Assessment",
        "start": "2021-08-13",
        "end": "2021-08-14"
      },
      {
        "id": 6,
        "title": "Assessment",
        "start": "2021-08-17",
        "end": "2021-08-17"
      },


    ]

    this.events = events;
    this.options = {
      initialDate: '2021-08-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };
    this.options = {...this.options, ...{events: events}};

  }



}
