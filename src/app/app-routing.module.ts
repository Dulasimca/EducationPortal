import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AchievementsComponent } from './DataView-Module/achievements/achievements.component';
import { AnnouncementComponent } from './DataView-Module/announcement/announcement.component';
import { AssignmentsInformationComponent } from './DataView-Module/assignments-information/assignments-information.component';
import { AssignmentsComponent } from './DataView-Module/assignments/assignments.component';
import { BooksComponent } from './DataView-Module/books/books.component';
import { CircularComponent } from './DataView-Module/circular/circular.component';
import { ClassroomDownloadComponent } from './DataView-Module/classroom-download/classroom-download.component';
import { FeesComponent } from './DataView-Module/fees/fees.component';
import { GalleryListComponent } from './DataView-Module/gallery-list/gallery-list.component';
import { InternaltransferComponent } from './DataView-Module/internaltransfer/internaltransfer.component';
import { MainresultComponent } from './DataView-Module/mainresult/mainresult.component';
import { NewsletterComponent } from './DataView-Module/newsletter/newsletter.component';
import { PollListComponent } from './DataView-Module/poll-list/poll-list.component';
import { ProfileComponent } from './DataView-Module/profile/profile.component';
import { QuestionbankComponent } from './DataView-Module/questionbank/questionbank.component';
import { ResultComponent } from './DataView-Module/result/result.component';
import { StudentInfoComponent } from './DataView-Module/student-info/student-info.component';
import { SubjectResultComponent } from './DataView-Module/subject-result/subject-result.component';
import { SubjectTestresultComponent } from './DataView-Module/subject-testresult/subject-testresult.component';
import { AttendanceComponent } from './Events-Module/attendance/attendance.component';
import { EventCalendarComponent } from './Events-Module/event-calendar/event-calendar.component';
import { OnlineAssessmentComponent } from './Events-Module/online-assessment/online-assessment.component';
import { OnlineClassroomComponent } from './Events-Module/online-classroom/online-classroom.component';
import { RegistrationFormComponent } from './Forms-Module/registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
//Srikanth
import { CircularFormComponent } from './Forms-Module/circular-form/Circular-form.component';
import { NewsletterFormComponent } from './Forms-Module/newsletter-form/Newsletter-form.component';
import { BookFormComponent } from './Forms-Module/book-form/book-form.component';
import { ResultFormComponent } from './Forms-Module/result-form/result-form.component';
import { GalleryFormComponent } from './Forms-Module/gallery-form/gallery-form.component';
import { DownloadsessionFormComponent } from './Forms-Module/downloadsession-form/downloadsession-form.component';
//Adithya
import { AnnouncementFormComponent } from './Forms-Module/announcement-form/announcement-form.component';
import { AssignmentFormComponent } from './Forms-Module/assignment-form/assignment-form.component';
import { MyachievementFormComponent } from './Forms-Module/myachievement-form/myachievement-form.component';
import { HolidaydetailsFormComponent } from './Forms-Module/holidaydetails-form/holidaydetails-form.component';
import { NomineeFormComponent } from './Forms-Module/nominee-form/nominee-form.component';
import { FeeFormComponent } from './Forms-Module/fee-form/fee-form.component';


import { AuthGuard } from './Services/auth.guard';
import { OnlineTestComponent } from './Events-Module/online-test/online-test.component';
import { TestDetailsFormComponent } from './Forms-Module/test-details-form/test-details-form.component';
import { QuestionBankUploadFormComponent } from './Forms-Module/question-bank-upload-form/question-bank-upload-form.component';
import { MyclassResultComponent } from './Forms-Module/myclass-result/myclass-result.component';
import { MySchoolComponent } from './Forms-Module/my-school/my-school.component';
import { PersonalDetailsComponent } from './Forms-Module/personal-details/personal-details.component';
import { AssessmentResultsComponent } from './Forms-Module/assessment-results/assessment-results.component';
import { FeesDetailsFormComponent } from './Forms-Module/fees-details-form/fees-details-form.component';
import { ClassroomDetailsComponent } from './Forms-Module/classroom-details/classroom-details.component';
import { ZoomClassroomComponent } from './Events-Module/zoom-classroom/zoom-classroom.component';
import { MyschoolViewComponent } from './DataView-Module/myschool-view/myschool-view.component';
import { ZoomComponent } from './Events-Module/zoom/zoom.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventCalendarComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'online-assessment', component: OnlineAssessmentComponent, canActivate: [AuthGuard] },
  { path: 'online-classroom', component: OnlineClassroomComponent, canActivate: [AuthGuard] },
  { path: 'poll-list', component: PollListComponent, canActivate: [AuthGuard] },
  { path: 'student-info', component: StudentInfoComponent, canActivate: [AuthGuard] },
  {path: 'gallery-list',component: GalleryListComponent, canActivate: [AuthGuard] },
  {​​​​​​​​ path:'result', component:ResultComponent , canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'subject-result', component:SubjectResultComponent , canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'subject-test-result', component:SubjectTestresultComponent  }​​​​​​​​,
  {​​​​​​​​ path:'question-bank', component:QuestionbankComponent , canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'mainresult', component:MainresultComponent , canActivate: [AuthGuard] }​​​​​​​​,
 { path: 'assignments-information', component: AssignmentsInformationComponent, canActivate: [AuthGuard] },
 { path: 'classroom-download', component: ClassroomDownloadComponent, canActivate: [AuthGuard] },
 { path: 'achievements', component: AchievementsComponent, canActivate: [AuthGuard] }, 
 { path: 'announcements', component: AnnouncementComponent, canActivate: [AuthGuard] },
 { path: 'circulars', component: CircularComponent, canActivate: [AuthGuard] },
 { path: 'assignments', component: AssignmentsComponent, canActivate: [AuthGuard] },
 { path: 'newsletters', component: NewsletterComponent, canActivate: [AuthGuard] },
 { path: 'internal-transfer', component: InternaltransferComponent, canActivate: [AuthGuard] },
 { path: 'fees', component: FeesComponent, canActivate: [AuthGuard] },
 { path: 'registration', component: RegistrationFormComponent, canActivate: [AuthGuard] },
 { path: 'online-test', component: OnlineTestComponent, canActivate: [AuthGuard] },
 { path: 'test-details', component: TestDetailsFormComponent, canActivate: [AuthGuard] },
 { path: 'classroom-details', component: ClassroomDetailsComponent, canActivate: [AuthGuard] },
 { path: 'join-classroom', component: ZoomClassroomComponent, canActivate: [AuthGuard] },
 { path: 'question-bank-upload', component: QuestionBankUploadFormComponent},
 { path: 'online-classroom-join', component: ZoomComponent, canActivate: [AuthGuard] },
 { path: 'myclass-results', component: MyclassResultComponent},
 { path: 'my-school', component: MySchoolComponent, canActivate: [AuthGuard]},
 { path: 'personal-details', component: PersonalDetailsComponent, canActivate: [AuthGuard]},
 { path: 'assessment-results', component: AssessmentResultsComponent},
 { path: 'fee-details', component: FeesDetailsFormComponent},
 { path: 'myschool-view', component: MyschoolViewComponent, canActivate: [AuthGuard]},

 
 //Adithya
   { path: 'announcement', component: AnnouncementFormComponent, canActivate: [AuthGuard] },
   { path: 'assignment', component: AssignmentFormComponent },
   { path: 'myachievement', component: MyachievementFormComponent, canActivate: [AuthGuard] },
   { path: 'holidaydetails', component: HolidaydetailsFormComponent, canActivate: [AuthGuard] },
   { path: 'nominee', component: NomineeFormComponent, canActivate: [AuthGuard] },
   { path: 'fee', component: FeeFormComponent, canActivate: [AuthGuard] },
   //Srikanth
   { path: 'circular', component: CircularFormComponent, canActivate: [AuthGuard] },
   { path: 'newsletter', component: NewsletterFormComponent, canActivate: [AuthGuard] },
   { path: 'book',component:BookFormComponent, canActivate: [AuthGuard]},
   { path: 'results',component:ResultFormComponent, canActivate: [AuthGuard]},
   { path: 'gallery',component:GalleryFormComponent, canActivate: [AuthGuard]},
   { path: 'downloadsession', component:DownloadsessionFormComponent, canActivate: [AuthGuard]}, 
   
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
