import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { CreateschoolComponent } from './components/createschool/createschool.component';
import { ListschoolsComponent } from './components/listschools/listschools.component';
import { ListstudentsComponent } from './components/liststudents/liststudents.component';
import { ListteachersComponent } from './components/listteachers/listteachers.component';
import { CreateteacherComponent } from './components/createteacher/createteacher.component';
import { CreatestudentComponent } from './components/createstudent/createstudent.component';
const routes: Routes = [
  { path: '', component: LogincomponentComponent },
  { path: 'login', component: LogincomponentComponent },
  { path: 'createschool', component: CreateschoolComponent },
  { path: 'listschools', component: ListschoolsComponent },
  { path: 'liststudents', component: ListstudentsComponent },
  { path: 'listteachers', component: ListteachersComponent },
  { path: 'createteachers', component: CreateteacherComponent },
  { path: 'createstudents', component: CreatestudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
