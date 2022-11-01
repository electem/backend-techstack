import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';

const routes: Routes = [
  { path: '', redirectTo: 'company-list', pathMatch: 'full' },
  { path: 'company', component: CreateCompanyComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'dept-list', component: DepartmentListComponent },
  { path: 'department', component: CreateDepartmentComponent },
  { path: 'edit-company/:id', component: EditCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
