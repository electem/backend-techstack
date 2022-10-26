import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CompanylistingComponent } from './components/companylisting/companylisting.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { DepartmentlistingComponent } from './components/departmentlisting/departmentlisting.component';
const routes: Routes = [
  { path: '', redirectTo: 'createcompany', pathMatch: 'full' },
  { path: 'createcompany', component: CreatecompanyComponent },
  { path: 'comapanylisting', component: CompanylistingComponent },
  { path: 'createdepartment', component: CreatedepartmentComponent },
  { path: 'departmentlisting', component: DepartmentlistingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
