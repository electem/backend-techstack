import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReporttableComponent } from './components/reporttable/reporttable.component';
import { AddpanelComponent } from './components/addpanel/addpanel.component';
import { EditpanelComponent } from './components/editpanel/editpanel.component';
import { AdddtestComponent } from './components/editpanel/adddtest/adddtest.component';
import { ReportComponent } from './components/report/report.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DatatablesComponent } from './components/tables/tables.component';

const routes: Routes = [
  { path: '', redirectTo: 'panels', pathMatch: 'full' },
  { path: 'addPanel', component: AddpanelComponent },
  { path: 'panels', component: PanelListComponent },
  { path: 'editpanels/:id', component: EditpanelComponent },
  { path: 'reporttable', component: ReporttableComponent },
  { path: 'test', component: AdddtestComponent },
  { path: 'report', component: ReportComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'tables', component: DatatablesComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
