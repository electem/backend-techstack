import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from '.././app/app.interceptor';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { PanelTestDetailsComponent } from './components/panel-test-details/panel-test-details.component';
import { AddPanelComponent } from './components/add-panel/add-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelListComponent,
    PanelTestDetailsComponent,
    AddPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
