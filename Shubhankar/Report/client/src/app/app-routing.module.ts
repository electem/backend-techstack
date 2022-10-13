import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PannellistComponent } from './components/pannellist/pannellist.component';
import { EditpannelComponent } from './components/editpannel/editpannel.component';
import { AddpannelComponent } from './components/addpannel/addpannel.component';
import { ReporttableComponent } from './components/reporttable/reporttable.component';
import { ReportrecordComponent } from './components/reportrecord/reportrecord.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyComponent } from './components/company/company.component';
import { EmployeerecordComponent } from './components/employeerecord/employeerecord.component';
// import { DatatableComponent } from './components/datatable/datatable.component';
// import { ChartComponent } from './components/chart/chart.component';
const routes: Routes = [
  { path: '', redirectTo: 'loginusers', pathMatch: 'full' },
  { path: 'pannels', component: PannellistComponent },
  { path: 'edit/:id', component: EditpannelComponent },
  { path: 'pannels/info', component: AddpannelComponent },
  { path: 'report', component: ReporttableComponent },
  { path: 'record', component: ReportrecordComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'list', component: EmployeerecordComponent },
  // { path: 'Datatable', component: DatatableComponent },
  // { path: 'chart', component: ChartComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
