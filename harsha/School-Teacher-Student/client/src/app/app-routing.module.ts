import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'school', component: CreateSchoolComponent },
  { path: 'school/:id', component: CreateSchoolComponent },
  { path: 'school-list', component: SchoolListComponent },
  { path: 'teacher-list', component: TeacherListComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'teacher', component: CreateTeacherComponent },
  { path: 'teacher/:id', component: CreateTeacherComponent },
  { path: 'student', component: CreateStudentComponent },
  { path: 'student/:id', component: CreateStudentComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
