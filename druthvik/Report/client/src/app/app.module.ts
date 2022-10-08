import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { HeadersInterceptor } from './headers.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReporttableComponent } from './components/reporttable/reporttable.component';
import { AddpanelComponent } from './components/addpanel/addpanel.component';
import { EditpanelComponent } from './components/editpanel/editpanel.component';
import { AdddtestComponent } from './components/editpanel/adddtest/adddtest.component';
import { ReportComponent } from './components/report/report.component';
import { DataTablesModule } from 'angular-datatables';
import { DatatablesComponent } from './components/tables/tables.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelListComponent,
    ReporttableComponent,
    AddpanelComponent,
    EditpanelComponent,
    PageNotFoundComponent,
    AdddtestComponent,
    ReportComponent,
    DatatablesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
