import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompanylistComponent } from './components/companylist/companylist.component'
import { CreatecompanyComponent } from './components/createcompany/createcompany.component'
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component'
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component'
import { EditcompanyComponent } from './components/editcompany/editcompany.component'
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component'

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'companylist', component: CompanylistComponent },
  { path: 'create', component: CreatecompanyComponent },
  { path: 'departmentlist', component: DepartmentlistComponent },
  { path: 'dept', component: CreatedepartmentComponent },
  { path: 'companyedit/:id', component: EditcompanyComponent },
  { path: 'deptedit/:id', component: EditdepartmentComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
