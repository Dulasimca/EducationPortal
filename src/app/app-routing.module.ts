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
//Adithya
import { AnnouncementFormComponent } from './Forms-Module/announcement-form/announcement-form.component';
import { AssignmentFormComponent } from './Forms-Module/assignment-form/assignment-form.component';
import { MyachievementFormComponent } from './Forms-Module/myachievement-form/myachievement-form.component';
import { HolidaydetailsFormComponent } from './Forms-Module/holidaydetails-form/holidaydetails-form.component';
import { NomineeFormComponent } from './Forms-Module/nominee-form/nominee-form.component';
import { AuthGuard } from './Services/auth.guard';


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
   //Adithya
   { path: 'announcement', component: AnnouncementFormComponent },
   { path: 'assignment', component: AssignmentFormComponent },
   { path: 'myachievement', component: MyachievementFormComponent },
   { path: 'holidaydetails', component: HolidaydetailsFormComponent },
   { path: 'nominee', component: NomineeFormComponent },
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
