import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { FileUploadDownloadComponent } from './components/file-upload-download/file-upload-download.component';
import { LoginComponent } from './components/login/login.component';
import { ChartsComponent } from './components/charts/charts.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'createcompany', component: CreateCompanyComponent },
  { path: 'createdepartment', component: CreateDepartmentComponent },
  { path: 'companylist', component: CompanyListComponent },
  { path: 'departmentlist', component: DepartmentListComponent },
  { path: 'editcompany/:id', component: EditCompanyComponent },
  { path: 'editdepartment/:id', component: EditDepartmentComponent },
  { path: 'fileupload', component: FileUploadDownloadComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
