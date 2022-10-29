import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'company-list', pathMatch: 'full' },
  { path: 'company', component: CreateCompanyComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'dept-list', component: DepartmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
