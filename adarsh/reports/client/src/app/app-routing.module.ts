import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelDetialsComponent } from './components/panel-detials/panel-detials.component';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { ReportDetialListComponent } from './components/report-detial-list/report-detial-list.component';
import { ReportlistComponent } from './components/reportlist/reportlist.component';


const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'panel', component: PanelListComponent },
  { path: 'panel/:id', component: PanelDetialsComponent },
  { path: 'report', component: ReportlistComponent },
  { path: 'reportdetial', component: ReportDetialListComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
