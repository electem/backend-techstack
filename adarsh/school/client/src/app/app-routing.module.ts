import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchoolComponent } from './components/add-school/add-school.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddTeachersComponent } from './components/add-teachers/add-teachers.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
import { StudentListingComponent } from './components/student-listing/student-listing.component';
import { TeacherListingComponent } from './components/teacher-listing/teacher-listing.component';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent },
  { path: 'schoolList', component: SchoolListingComponent },
  { path: 'add', component: AddSchoolComponent },
  { path: 'teacherList', component: TeacherListingComponent },
  { path: 'addTeacher', component: AddTeachersComponent },
  { path: 'studentList', component: StudentListingComponent },
  { path: 'addStudent', component: AddStudentComponent },
  { path: 'school/:id', component:  AddSchoolComponent},
  { path: 'student/:id', component:  AddStudentComponent},
  { path: 'teacher/:id', component:  AddTeachersComponent},
  { path: 'chart', component:  ChartComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
