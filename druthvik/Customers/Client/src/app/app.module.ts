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
import { CreatecustomerComponent } from '../app/components/createcustomer/createcustomer.component';
import { CustomerlistComponent } from '../app/components/customerlist/customerlist.component';
import { CustomereditComponent } from './components/customeredit/customeredit.component';
import { AddcustomergroupComponent } from './components/addcustomergroup/addcustomergroup.component';
import { CustomergrouplistComponent } from './components/customergrouplist/customergrouplist.component';
import { EditcustomergroupComponent } from './components/editcustomergroup/editcustomergroup.component';
import { GameplayerComponent } from './components/gameplayer/gameplayer.component';
import { EditgameplayerComponent } from './components/editgameplayer/editgameplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserloginComponent,
    RegisteruserComponent,
    CreatecustomerComponent,
    CustomerlistComponent,
    CustomereditComponent,
    CustomergrouplistComponent,
    AddcustomergroupComponent,
    GameplayerComponent,
    EditcustomergroupComponent,
    EditgameplayerComponent,
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
