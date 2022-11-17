import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateschoolComponent } from './components/createschool/createschool.component';
import { SchoollistingComponent } from './components/schoollisting/schoollisting.component';
import { TeacherlistingComponent } from './components/teacherlisting/teacherlisting.component';
import { CreateteacherComponent } from './components/createteacher/createteacher.component';
import { CreatestudentComponent } from './components/createstudent/createstudent.component';
import { StudentlistComponent } from './components/studentlist/studentlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'addschool', component: CreateschoolComponent },
  { path: 'school-list', component: SchoollistingComponent },
  { path: 'teacher-list', component: TeacherlistingComponent },
  { path: 'addteacher', component: CreateteacherComponent },
  { path: 'addstudent', component: CreatestudentComponent },
  { path: 'student-list', component: StudentlistComponent },
  { path: 'addschool/:id', component: CreateschoolComponent },
  { path: 'addteacher/:id', component: CreateteacherComponent },
  { path: 'addstudent/:id', component: CreatestudentComponent },
  { path: 'dash', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
