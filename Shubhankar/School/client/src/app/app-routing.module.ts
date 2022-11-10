import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateschoolComponent } from './components/createschool/createschool.component';
import { SchoollistingComponent } from './components/schoollisting/schoollisting.component';
import { TeacherlistingComponent } from './components/teacherlisting/teacherlisting.component';
import { CreateteacherComponent } from './components/createteacher/createteacher.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'addschool', component: CreateschoolComponent},
  { path: 'school-list', component: SchoollistingComponent},
  { path: 'teacher-list', component: TeacherlistingComponent},
  { path: 'addteacher', component: CreateteacherComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
