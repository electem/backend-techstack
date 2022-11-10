import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { TeacherListingComponent } from './components/teacher-listing/teacher-listing.component';
import { StudentListingComponent } from './components/student-listing/student-listing.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'createschool', component: CreateSchoolComponent },
  { path: 'schoollisting', component: SchoolListingComponent },
  { path: 'createteacher', component: CreateTeacherComponent },
  { path: 'createstudent', component: CreateStudentComponent },
  { path: 'teacherslist', component: TeacherListingComponent },
  { path: 'studentslist', component: StudentListingComponent },
  { path: 'createschool/:id', component: CreateSchoolComponent },
  { path: 'createstudent/:id', component: CreateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
