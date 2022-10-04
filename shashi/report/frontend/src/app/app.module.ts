import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from '.././app/app.interceptor';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { ReportComponent } from './components/report/report.component';
import { AddPanelComponent } from './components/add-panel/add-panel.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ChartComponent } from './components/chart/chart.component';
import { DatatablesComponent } from './components/datatables/datatables.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    PanelListComponent,
    ReportComponent,
    AddPanelComponent,
    ReportListComponent,
    ChartComponent,
    DatatablesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
