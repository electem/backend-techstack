import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PanelDetailsComponent } from './components/panel-details/panel-details.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'panels', pathMatch: 'full' },
  { path: 'panels', component: PanelListComponent },
  { path: 'panels/:id', component: PanelDetailsComponent },
  { path: 'data-tables', component: DataTableComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-list', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
