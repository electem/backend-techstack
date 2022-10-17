import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerGroupComponent } from './components/add-customer-group/add-customer-group.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerGroupComponent } from './components/customer-group/customer-group.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'registor', component: UserRegistrationComponent },
  { path: 'customer', component: CustomerListComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'customer/:id', component: EditCustomerComponent },
  { path: 'customergroup', component: CustomerGroupComponent },
  { path: 'addcustomergroup', component: AddCustomerGroupComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
