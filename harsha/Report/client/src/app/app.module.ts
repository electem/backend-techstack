import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PanelDetailsComponent } from './components/panel-details/panel-details.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelListComponent,
    PanelDetailsComponent,
    DataTableComponent,
    ChartsComponent,
    ProductComponent,
    ProductListComponent,
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
