import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserloginComponent } from './components/userLogin/userlogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: UserloginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
