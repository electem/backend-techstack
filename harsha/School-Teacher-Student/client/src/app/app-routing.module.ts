import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListComponent } from './components/school-list/school-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'add-school', component: CreateSchoolComponent },
  { path: 'school-list', component: SchoolListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
