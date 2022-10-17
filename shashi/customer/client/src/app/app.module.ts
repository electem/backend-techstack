import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserloginComponent } from './components/userLogin/userlogin.component';
import { AppHttpInterceptor } from './app.interceptor';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { CustomerComponent } from './components/customerList/customerList.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerGroupListComponent } from './components/customer-group-list/customer-group-list.component';
import { CreateCustomerGroupComponent } from './components/create-customer-group/create-customer-group.component';

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    UserRegistrationComponent,
    CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    CustomerGroupListComponent,
    CreateCustomerGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
