import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CompanylistingComponent } from './components/companylisting/companylisting.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { DepartmentlistingComponent } from './components/departmentlisting/departmentlisting.component';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { FileuploaddownloadComponent } from './components/fileuploaddownload/fileuploaddownload.component';
import { DashboardwithchartsComponent } from './components/dashboardwithcharts/dashboardwithcharts.component';
import { NavigationComponent } from './components/navigation/navigation.component';
//import { AuthGuard } from './auth/auth-guard';
const routes: Routes = [
  { path: '', component: LogincomponentComponent },
  { path: 'login', component: LogincomponentComponent },
  { path: 'createcompany', component: CreatecompanyComponent },
  { path: 'companylisting', component: CompanylistingComponent },
  { path: 'createdepartment', component: CreatedepartmentComponent },
  { path: 'departmentlisting', component: DepartmentlistingComponent },
  { path: 'editcompany/:id', component: EditcompanyComponent },
  { path: 'editdepartment/:id', component: EditdepartmentComponent },
  { path: 'fileupload', component: FileuploaddownloadComponent },
  { path: 'navi', component: NavigationComponent },
  { path: 'dash', component: DashboardwithchartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
