import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersInterceptor } from './headers.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserloginComponent } from '../app/components/userlogin/userlogin.component';
import { RegisteruserComponent } from '../app/components/registeruser/registeruser.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserloginComponent,
    RegisteruserComponent,
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
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
