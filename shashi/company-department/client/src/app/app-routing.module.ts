import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
const routes: Routes = [
  { path: '', redirectTo: 'companylist', pathMatch: 'full' },
  { path: 'createcompany', component: CreateCompanyComponent },
  { path: 'createdepartment', component: CreateDepartmentComponent },
  { path: 'companylist', component: CompanyListComponent },
  { path: 'departmentlist', component: DepartmentListComponent },
  { path: 'editcompany/:id', component: EditCompanyComponent },
  { path: 'editdepartment/:id', component: EditDepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}