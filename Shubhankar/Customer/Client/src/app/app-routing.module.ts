import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { CustomergroupComponent } from './components/customergroup/customergroup.component';
import { AddcustomergroupComponent } from './components/addcustomergroup/addcustomergroup.component';
import { EditcustomergroupComponent } from './components/editcustomergroup/editcustomergroup.component';
import { EditcustomerComponent } from './components/editcustomer/editcustomer.component';
import { GamelistComponent } from './components/gamelist/gamelist.component';
import { EditgameComponent } from './components/editgame/editgame.component';
import { AssigncustomerchildeditComponent } from './components/editcustomergroup/assigncustomerchildedit/assigncustomerchildedit.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
const routes: Routes = [
  { path: '', redirectTo: 'loginusers', pathMatch: 'full' },
  { path: 'loginusers', component: LoginComponent },
  { path: 'Registerusers', component: RegisterComponent },
  { path: 'list', component: CustomerlistComponent },
  { path: 'add', component: AddcustomerComponent },
  { path: 'group', component: CustomergroupComponent },
  { path: 'addgroup', component: AddcustomergroupComponent },
  { path: 'editgroup/:id', component: EditcustomergroupComponent },
  { path: 'edit/:id', component: EditcustomerComponent },
  { path: 'game', component: GamelistComponent },
  { path: 'gameedit/:id', component: EditgameComponent },
  { path: 'Customeredit', component: AssigncustomerchildeditComponent },
  { path: 'company', component: CompanylistComponent },
  { path: 'department', component: DepartmentlistComponent },
  { path: 'create', component: CreatecompanyComponent },
  { path: 'dept', component: CreatedepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
