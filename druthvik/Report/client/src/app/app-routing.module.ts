import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'panels', pathMatch: 'full' },

  { path: 'panels', component: PanelListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
