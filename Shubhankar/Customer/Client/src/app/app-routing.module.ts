import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { CustomerlistComponent } from './components/customerlist/customerlist.component'
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component'
import { CustomergroupComponent } from './components/customergroup/customergroup.component'
import { AddEditgroupComponent } from './components/add-editgroup/add-editgroup.component'
const routes: Routes = [
  { path: '', redirectTo: 'loginusers', pathMatch: 'full' },
{ path: 'loginusers', component: LoginComponent },
{ path: 'Registerusers', component: RegisterComponent },
{ path: 'list', component: CustomerlistComponent },
{ path: 'add', component: AddcustomerComponent },
{ path: 'group', component: CustomergroupComponent },
{ path: 'edit', component: AddEditgroupComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
