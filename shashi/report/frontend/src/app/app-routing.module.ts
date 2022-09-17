import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PanelTestDetailsComponent } from './components/panel-test-details/panel-test-details.component';
import { AddPanelComponent } from './components/add-panel/add-panel.component';
const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'panel', component: PanelListComponent },
  { path: 'testDetails', component: PanelTestDetailsComponent },
  { path: 'addpanel', component: AddPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
