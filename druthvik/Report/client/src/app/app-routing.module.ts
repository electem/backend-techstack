import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'panels', pathMatch: 'full' },
  { path: 'panels', component: PanelListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
