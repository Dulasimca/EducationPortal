import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { NgxAttendanceLibraryModule } from 'ngx-attendance-library';
import {FullCalendarModule} from '@fullcalendar/angular';
import {MegaMenuModule} from 'primeng/megamenu';
import {CheckboxModule} from 'primeng/checkbox';
import {GalleriaModule} from 'primeng/galleria';
import {DialogModule} from 'primeng/dialog';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {PanelMenuModule} from 'primeng/panelmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { OnlineClassroomComponent } from './online-classroom/online-classroom.component';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { OnlineAssessmentComponent } from './online-assessment/online-assessment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BooksComponent } from './books/books.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { FeesComponent } from './fees/fees.component';
import {TabViewModule} from 'primeng/tabview';
import { LoginComponent } from './login/login.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import {TooltipModule} from 'primeng/tooltip';
import { DownloadClassComponent } from './download-class/download-class.component';
import { ResultComponent } from './result/result.component';
import { SubjectResultComponent } from './subject-result/subject-result.component';
import { SubjectTestresultComponent } from './subject-testresult/subject-testresult.component';
import { QuestionbankComponent } from './questionbank/questionbank.component';
import { MainresultComponent } from './mainresult/mainresult.component';
import { AssignmentsInformationComponent } from './assignments-information/assignments-information.component';
import { ClassroomDownloadComponent } from './classroom-download/classroom-download.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CircularComponent } from './circular/circular.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { InternaltransferComponent } from './internaltransfer/internaltransfer.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    PollListComponent,
    OnlineClassroomComponent,
    OnlineAssessmentComponent,
    AttendanceComponent,
    BooksComponent,
    EventCalendarComponent,
    StudentInfoComponent,
    FeesComponent,
    LoginComponent,
    GalleryListComponent,
    DownloadClassComponent,
    ResultComponent,
    SubjectResultComponent,
    SubjectTestresultComponent,
    QuestionbankComponent,
    MainresultComponent,
    AssignmentsInformationComponent,
    ClassroomDownloadComponent,
    AchievementsComponent,
    AnnouncementComponent,
    CircularComponent,
    AssignmentsComponent,
    NewsletterComponent,
    InternaltransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MenubarModule,
    DropdownModule,
    SidebarModule,
    PanelModule,
    CardModule,
    DividerModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    RippleModule,
    TableModule,
    NgxAttendanceLibraryModule,
    FullCalendarModule,
    TabViewModule,
    CheckboxModule,
    GalleriaModule,
    TooltipModule,
    MegaMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    DialogModule,
    PanelMenuModule
  ],
  providers: [PrimeNGConfig, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
