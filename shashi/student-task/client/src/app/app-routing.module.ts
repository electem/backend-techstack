import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'createschool', component: CreateSchoolComponent },
  { path: 'schoollisting', component: SchoolListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
