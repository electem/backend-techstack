import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserloginComponent } from './components/userLogin/userlogin.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { CustomerComponent } from './components/customerList/customerList.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerGroupListComponent } from './components/customer-group-list/customer-group-list.component';
import { CreateCustomerGroupComponent } from './components/create-customer-group/create-customer-group.component';
import { EditCustomerGroupComponent } from './components/edit-customer-group/edit-customer-group.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { EditGameListComponent } from './components/edit-game-list/edit-game-list.component';
import { OutputCustomerGroupComponent } from './components/edit-customer-group/output-customer-group/output-customer-group.component';
const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'userRegister', component: UserRegistrationComponent },
  { path: 'customerList', component: CustomerComponent },
  { path: 'Create-customer', component: CreateCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'customergroupList', component: CustomerGroupListComponent },
  { path: 'createcustomergroup', component: CreateCustomerGroupComponent },
  { path: 'editcustomergroup/:id', component: EditCustomerGroupComponent },
  { path: 'gamelist', component: GameListComponent },
  { path: 'editgamelist/:id', component: EditGameListComponent },
  { path: 'output', component: OutputCustomerGroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
