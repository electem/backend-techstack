import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PannellistComponent } from './components/pannellist/pannellist.component';
import { EditpannelComponent } from './components/editpannel/editpannel.component';
import { AddpannelComponent } from './components/addpannel/addpannel.component';
import { ReporttableComponent } from './components/reporttable/reporttable.component';
const routes: Routes = [
  { path: '', redirectTo: 'loginusers', pathMatch: 'full' },
  { path: 'pannels', component: PannellistComponent },
  { path: 'edit/:id', component: EditpannelComponent },
  { path: 'pannels/info', component: AddpannelComponent },
  { path: 'report', component: ReporttableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
