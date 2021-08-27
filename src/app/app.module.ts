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
import { TooltipModule } from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FieldsetModule} from 'primeng/fieldset';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './DataView-Module/profile/profile.component';
import { PollListComponent } from './DataView-Module/poll-list/poll-list.component';
import { OnlineClassroomComponent } from './Events-Module/online-classroom/online-classroom.component';
import { OnlineAssessmentComponent } from './Events-Module/online-assessment/online-assessment.component';
import { AttendanceComponent } from './Events-Module/attendance/attendance.component';
import { BooksComponent } from './DataView-Module/books/books.component';
import { EventCalendarComponent } from './Events-Module/event-calendar/event-calendar.component';
import { StudentInfoComponent } from './DataView-Module/student-info/student-info.component';
import { FeesComponent } from './DataView-Module/fees/fees.component';
import { GalleryListComponent } from './DataView-Module/gallery-list/gallery-list.component';
import { DownloadClassComponent } from './DataView-Module/download-class/download-class.component';
import { ResultComponent } from './DataView-Module/result/result.component';
import { SubjectResultComponent } from './DataView-Module/subject-result/subject-result.component';
import { SubjectTestresultComponent } from './DataView-Module/subject-testresult/subject-testresult.component';
import { QuestionbankComponent } from './DataView-Module/questionbank/questionbank.component';
import { MainresultComponent } from './DataView-Module/mainresult/mainresult.component';
import { AssignmentsInformationComponent } from './DataView-Module/assignments-information/assignments-information.component';
import { ClassroomDownloadComponent } from './DataView-Module/classroom-download/classroom-download.component';
import { AchievementsComponent } from './DataView-Module/achievements/achievements.component';
import { AnnouncementComponent } from './DataView-Module/announcement/announcement.component';
import { CircularComponent } from './DataView-Module/circular/circular.component';
import { AssignmentsComponent } from './DataView-Module/assignments/assignments.component';
import { NewsletterComponent } from './DataView-Module/newsletter/newsletter.component';
import { InternaltransferComponent } from './DataView-Module/internaltransfer/internaltransfer.component';
import { RegistrationFormComponent } from './Forms-Module/registration-form/registration-form.component';
import { AuthService } from './Services/auth.service';
import { RestAPIService } from './Services/restAPI.service';
import { CircularFormComponent } from './Forms-Module/circular-form/circular-form.component';
import { AnnouncementFormComponent } from './Forms-Module/announcement-form/announcement-form.component';
import { AuthGuard } from './Services/auth.guard';
import { NewsletterFormComponent } from './Forms-Module/newsletter-form/newsletter-form.component';
import { BookFormComponent } from './Forms-Module/book-form/book-form.component';
import { ResultFormComponent } from './Forms-Module/result-form/result-form.component';
import { GalleryFormComponent } from './Forms-Module/gallery-form/gallery-form.component';

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
    RegistrationFormComponent,
    CircularFormComponent,
    AnnouncementFormComponent,
    NewsletterFormComponent,
    BookFormComponent,
    ResultFormComponent,
    GalleryFormComponent,
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
    PanelMenuModule,
    InputTextareaModule,
    FieldsetModule
  ],
  providers: [PrimeNGConfig, FilterService, AuthGuard, AuthService, RestAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
