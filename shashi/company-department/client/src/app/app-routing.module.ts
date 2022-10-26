import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'createcompany', component: CreateCompanyComponent },
  { path: 'createdepartment', component: CreateDepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
