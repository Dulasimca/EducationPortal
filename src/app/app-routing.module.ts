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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'events', component: EventCalendarComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'books', component: BooksComponent },
  { path: 'online-assessment', component: OnlineAssessmentComponent },
  { path: 'online-classroom', component: OnlineClassroomComponent },
  { path: 'poll-list', component: PollListComponent },
  { path: 'student-info', component: StudentInfoComponent },
  {path: 'gallery-list',component: GalleryListComponent},
  {​​​​​​​​ path:'result', component:ResultComponent }​​​​​​​​,
  {​​​​​​​​ path:'subject-result', component:SubjectResultComponent }​​​​​​​​,
  {​​​​​​​​ path:'subject-test-result', component:SubjectTestresultComponent }​​​​​​​​,
  {​​​​​​​​ path:'question-bank', component:QuestionbankComponent }​​​​​​​​,
  {​​​​​​​​ path:'mainresult', component:MainresultComponent }​​​​​​​​,
 { path: 'assignments-information', component: AssignmentsInformationComponent },
 { path: 'classroom-download', component: ClassroomDownloadComponent },
 { path: 'achievements', component: AchievementsComponent }, 
 { path: 'announcements', component: AnnouncementComponent },
 { path: 'circulars', component: CircularComponent },
 { path: 'assignments', component: AssignmentsComponent },
 { path: 'newsletters', component: NewsletterComponent },
 { path: 'internal-transfer', component: InternaltransferComponent },
 { path: 'fees', component: FeesComponent },
 { path: 'registration', component: RegistrationFormComponent },
 //Adithya
 { path: 'announcement', component: AnnouncementFormComponent },
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
