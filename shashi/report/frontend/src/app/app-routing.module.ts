import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { ReportComponent } from './components/report/report.component';
import { AddPanelComponent } from './components/add-panel/add-panel.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ChartComponent } from './components/chart/chart.component';
import { DatatablesComponent } from './components/datatables/datatables.component';
const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'panel', component: PanelListComponent },
  { path: 'reporttable', component: ReportComponent },
  { path: 'addpanel', component: AddPanelComponent },
  { path: 'reportLists', component: ReportListComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'data-tables', component: DatatablesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
