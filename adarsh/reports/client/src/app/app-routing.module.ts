import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'panel', component: PanelListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
