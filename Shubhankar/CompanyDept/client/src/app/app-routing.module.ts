import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component';
import { LoginComponent } from './components/login/login.component';
import { ChartComponent } from './components/chart/chart.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminpageComponent },
  { path: 'companylist', component: CompanylistComponent },
  { path: 'create', component: CreatecompanyComponent },
  { path: 'departmentlist', component: DepartmentlistComponent },
  { path: 'dept', component: CreatedepartmentComponent },
  { path: 'companyedit/:id', component: EditcompanyComponent },
  { path: 'deptedit/:id', component: EditdepartmentComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'nav', component: SidenavComponent },
  { path: 'upload', component: FileuploadComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
