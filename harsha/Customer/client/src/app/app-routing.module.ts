import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerGroupComponent } from './components/customer-group/customer-group.component';
import { CustomerGroupListingComponent } from './components/customer-group-listing/customer-group-listing.component';
import { EditCustomerGroupComponent } from './components/edit-customer-group/edit-customer-group.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

const routes: Routes = [
  { path: '', redirectTo: 'userLogin', pathMatch: 'full' },
  { path: 'userLogin', component: UserLoginComponent },
  { path: 'userRegister', component: UserRegisterComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-group', component: CustomerGroupComponent },
  { path: 'customer-group-list', component: CustomerGroupListingComponent },
  { path: 'edit-customer-group/:id', component: EditCustomerGroupComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'edit-game/:id', component: EditGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
