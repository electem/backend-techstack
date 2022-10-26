import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CompanylistingComponent } from './components/companylisting/companylisting.component';

const routes: Routes = [
  { path: '', redirectTo: 'createcompany', pathMatch: 'full' },
  { path: 'createcompany', component: CreatecompanyComponent },
  { path: 'comapanylisting', component: CompanylistingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
