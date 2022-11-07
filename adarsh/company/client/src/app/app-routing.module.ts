import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLIstComponent } from './components/company-list/company-list.component';
import { AddCmpanyComponent } from './components/add-cmpany/add-cmpany.component'
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { Department } from './models/depertment';
import { DepartmentListingComponent } from './components/department-listing/department-listing.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ChartComponent } from './components/chart/chart.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'loginuser', component: LoginUserComponent },
  { path: 'list', component: CompanyLIstComponent },
  { path: 'add', component: AddCmpanyComponent },
  { path: 'company/:id', component: EditCompanyComponent },
  { path: 'departmenstList', component: DepartmentListingComponent },
  { path: 'adddepartment', component: AddDepartmentComponent },
  { path: 'department/:id', component: EditDepartmentComponent },
  { path: 'chart', component: ChartComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
