import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { FileUploadDownloadComponent } from './components/file-upload-download/file-upload-download.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'company', component: CreateCompanyComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'dept-list', component: DepartmentListComponent },
  { path: 'department', component: CreateDepartmentComponent },
  { path: 'edit-company/:id', component: EditCompanyComponent },
  { path: 'edit-department/:id', component: EditDepartmentComponent },
  { path: 'file', component: FileUploadDownloadComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
