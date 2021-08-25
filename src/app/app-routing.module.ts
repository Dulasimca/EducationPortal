import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { BooksComponent } from './books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { FeesComponent } from './fees/fees.component';
import { LoginComponent } from './login/login.component';
import { OnlineAssessmentComponent } from './online-assessment/online-assessment.component';
import { OnlineClassroomComponent } from './online-classroom/online-classroom.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentInfoComponent } from './student-info/student-info.component';

import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { ResultComponent } from './result/result.component';
import { SubjectResultComponent } from './subject-result/subject-result.component';
import { SubjectTestresultComponent} from './subject-testresult/subject-testresult.component';
import { QuestionbankComponent} from './questionbank/questionbank.component';
import { MainresultComponent} from './mainresult/mainresult.component';
import { AssignmentsInformationComponent } from './assignments-information/assignments-information.component';
import { ClassroomDownloadComponent } from './classroom-download/classroom-download.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { CircularComponent } from './circular/circular.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { InternaltransferComponent } from './internaltransfer/internaltransfer.component';
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
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
