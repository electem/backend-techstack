import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CompanylistingComponent } from './components/companylisting/companylisting.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { DepartmentlistingComponent } from './components/departmentlisting/departmentlisting.component';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component';
const routes: Routes = [
  { path: '', redirectTo: 'createcompany', pathMatch: 'full' },
  { path: 'createcompany', component: CreatecompanyComponent },
  { path: 'companylisting', component: CompanylistingComponent },
  { path: 'createdepartment', component: CreatedepartmentComponent },
  { path: 'departmentlisting', component: DepartmentlistingComponent },
  { path: 'editcompany/:id', component: EditcompanyComponent },
  { path: 'editdepartment/:id', component: EditdepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}