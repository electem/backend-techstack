import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchoolComponent } from './components/add-school/add-school.component';
import { AddTeachersComponent } from './components/add-teachers/add-teachers.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
import { TeacherListingComponent } from './components/teacher-listing/teacher-listing.component';



const routes: Routes = [
  { path: '', redirectTo: 'schoolList', pathMatch: 'full' },
  { path: 'schoolList', component: SchoolListingComponent },
  { path: 'add', component: AddSchoolComponent },
  { path: 'teacherList', component: TeacherListingComponent },
  { path: 'addTeacher', component: AddTeachersComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
