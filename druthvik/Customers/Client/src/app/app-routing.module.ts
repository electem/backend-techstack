import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserloginComponent } from '../app/components/userlogin/userlogin.component';
import { RegisteruserComponent } from '../app/components/registeruser/registeruser.component';
import { CreatecustomerComponent } from '../app/components/createcustomer/createcustomer.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
const routes: Routes = [
  { path: '', redirectTo: 'registeruser', pathMatch: 'full' },
  { path: 'loginuser', component: UserloginComponent },
  { path: 'registeruser', component: RegisteruserComponent },
  { path: 'createcustomer', component: CreatecustomerComponent },
  { path: 'customerlist', component: CustomerlistComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
