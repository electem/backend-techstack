import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserloginComponent } from '../app/components/userlogin/userlogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'registeruser', pathMatch: 'full' },
  { path: 'registeruser', component: UserloginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
