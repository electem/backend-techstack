import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PannellistComponent } from './components/pannellist/pannellist.component';

const routes: Routes = [
  { path: '', redirectTo: 'loginusers', pathMatch: 'full' },
  { path: 'pannels', component: PannellistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
