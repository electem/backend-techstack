import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';

//import { AuthGuard } from './auth/auth-guard';
const routes: Routes = [
  { path: '', component: LogincomponentComponent },
  { path: 'login', component: LogincomponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
