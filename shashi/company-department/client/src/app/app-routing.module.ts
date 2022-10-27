import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
const routes: Routes = [
  { path: '', redirectTo: 'companylist', pathMatch: 'full' },
  { path: 'createcompany', component: CreateCompanyComponent },
  { path: 'createdepartment', component: CreateDepartmentComponent },
  { path: 'companylist', component: CompanyListComponent },
  { path: 'departmentlist', component: DepartmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
