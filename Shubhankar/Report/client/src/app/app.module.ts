import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersInterceptor } from './headers.interceptor';
import { PannellistComponent } from './components/pannellist/pannellist.component';
import { AddpannelComponent } from './components/addpannel/addpannel.component';
import { EditpannelComponent } from './components/editpannel/editpannel.component';
import { ReporttableComponent } from './components/reporttable/reporttable.component';
// import { ReporttableComponent } from './components/reporttable/reporttable.component';

@NgModule({
  declarations: [AppComponent, PannellistComponent, AddpannelComponent, EditpannelComponent, ReporttableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
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
