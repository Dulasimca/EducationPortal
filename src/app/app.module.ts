import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NgxAttendanceLibraryModule, NgxAttendanceLibraryService } from 'ngx-attendance-library';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'ng-block-ui';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { KnobModule } from "primeng/knob";
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterService, MessageService, PrimeNGConfig } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
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
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Services/auth.guard';
import { NewsletterFormComponent } from './Forms-Module/newsletter-form/newsletter-form.component';
import { BookFormComponent } from './Forms-Module/book-form/book-form.component';
import { ResultFormComponent } from './Forms-Module/result-form/result-form.component';
import { GalleryFormComponent } from './Forms-Module/gallery-form/gallery-form.component';
import { OnlineTestComponent } from './Events-Module/online-test/online-test.component';
import { AssignmentFormComponent } from './Forms-Module/assignment-form/assignment-form.component';
import { MyachievementFormComponent } from './Forms-Module/myachievement-form/myachievement-form.component';
import { HolidaydetailsFormComponent } from './Forms-Module/holidaydetails-form/holidaydetails-form.component';
import { NomineeFormComponent } from './Forms-Module/nominee-form/nominee-form.component';
import { TestDetailsFormComponent } from './Forms-Module/test-details-form/test-details-form.component';
import { DownloadsessionFormComponent } from './Forms-Module/downloadsession-form/downloadsession-form.component';
import { QuestionBankUploadFormComponent } from './Forms-Module/question-bank-upload-form/question-bank-upload-form.component';
import { MyclassResultComponent } from './Forms-Module/myclass-result/myclass-result.component';
import { MySchoolComponent } from './Forms-Module/my-school/my-school.component';
import { PersonalDetailsComponent } from './Forms-Module/personal-details/personal-details.component';
import { AssessmentResultsComponent } from './Forms-Module/assessment-results/assessment-results.component';
import { CalendarDetailsFormComponent } from './Forms-Module/calendar-details-form/calendar-details-form.component';
import { AttendanceDetailsFormComponent } from './Forms-Module/attendance-details-form/attendance-details-form.component';
import { DatePipe } from '@angular/common';
import { MasterService } from './Services/master-data.service';
import { FeeFormComponent } from './Forms-Module/fee-form/fee-form.component';
import { ExcelService } from './Services/excel.service';
import { AssessmentService } from './Services/online-test.service';
import { ClassroomDetailsComponent } from './Forms-Module/classroom-details/classroom-details.component';
import { UserService } from './Services/user.service';
import { MyschoolViewComponent } from './DataView-Module/myschool-view/myschool-view.component';
import { ZoomComponent } from './Events-Module/zoom/zoom.component';
import { ZoomService } from './Services/zoom.service';
import { UploadDownloadformsComponent } from './Forms-Module/upload-downloadforms/upload-downloadforms.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { InputFormatDirective } from './Directives/input-format.directive';
import { NgxPrintModule } from 'ngx-print';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { AssessmentComponent } from './Forms-Module/assessment/assessment.component';
import { FeesDetailsComponent } from './DataView-Module/fees-details/fees-details.component';
import { AssessmentResultComponent } from './Forms-Module/assessment-result/assessment-result.component';
import { SchoolmasterComponent } from './Forms-Module/schoolmaster/schoolmaster.component';

  
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
// export function initGapi(gapiSession: GapiSession) {
//   return () => gapiSession.initClient();
// }

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
    OnlineTestComponent,
    AssignmentFormComponent,
    MyachievementFormComponent,
    HolidaydetailsFormComponent,
    NomineeFormComponent,
    TestDetailsFormComponent,
    DownloadsessionFormComponent,
    QuestionBankUploadFormComponent,
    MyclassResultComponent,
    MySchoolComponent,
    PersonalDetailsComponent,
    AssessmentResultsComponent,
    FeesDetailsComponent,
    CalendarDetailsFormComponent,
    AttendanceDetailsFormComponent,
    FeeFormComponent,
    ClassroomDetailsComponent,
    MyschoolViewComponent,
    ZoomComponent,
    UploadDownloadformsComponent,
    InputFormatDirective,
    AssessmentComponent,
    AssessmentResultComponent,
    SchoolmasterComponent,
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
    MatToolbarModule,
    DialogModule,
    PanelMenuModule,
    InputTextareaModule,
    FieldsetModule,
    FileUploadModule,
    HttpClientModule,
    MatDatepickerModule,
    ToastModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,  
      HttpClientModule,  
    ProgressBarModule,
   // BlockUIModule
    OverlayPanelModule,
    NgxPrintModule,
    ConfirmDialogModule,
    FlexLayoutModule,
    MatIconModule,
    KnobModule,
    MatSidenavModule,
    BlockUIModule.forRoot()
  ],
  providers: [PrimeNGConfig, FilterService, AuthGuard, AuthService, RestAPIService,
    NgxAttendanceLibraryService, DatePipe, MessageService, MasterService, ExcelService,
    AssessmentService, UserService, ZoomService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
