import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateschoolComponent } from './components/createschool/createschool.component';
import { SchoollistingComponent } from './components/schoollisting/schoollisting.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'addschool', component: CreateschoolComponent},
  { path: 'school-list', component: SchoollistingComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
