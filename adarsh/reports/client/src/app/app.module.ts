import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PanelDetialsComponent } from './components/panel-detials/panel-detials.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportlistComponent } from './components/reportlist/reportlist.component';
import { ReportDetialListComponent } from './components/report-detial-list/report-detial-list.component';




@NgModule({
  declarations: [AppComponent, PanelListComponent, PanelDetialsComponent, ReportlistComponent, ReportDetialListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
