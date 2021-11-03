import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

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
  header: any;
  logged_user: User;

  constructor(private restApiService: RestAPIService, private authService: AuthService) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.loadEvents();
  }

  loadEvents() {
    this.restApiService.getByParameters(PathConstants.Event_Calendar_Get, { 'SchoolID': this.logged_user.schoolId }).subscribe((events: any) => {
      if (events !== undefined && events !== null && events.length !== 0) {
        var setInitialDate = new Date().getFullYear()  + '-01-01';
        var data: any = [];
        events.forEach(e => {
          console.log('e', e);
          data.push({
            'id': e.RowId,
            'title': e.EventDetailS,
            'start': e.eventdate,
         //   'color': ((e.Holiday * 1) === 1) ? 'green' : 'blue'
          })
          console.log('data', data);
        })
        this.events = data;
        this.options = {
          initialDate: setInitialDate,
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
        this.options = { ...this.options, ...{ events: data } };
      }
    })
  }


}
