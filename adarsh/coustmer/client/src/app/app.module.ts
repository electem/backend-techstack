import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerGroupComponent } from './components/customer-group/customer-group.component';
import { AddCustomerGroupComponent } from './components/add-customer-group/add-customer-group.component';


@NgModule({
  declarations: [AppComponent, UserRegistrationComponent, UserLoginComponent, CustomerListComponent, AddCustomerComponent, EditCustomerComponent, CustomerGroupComponent, AddCustomerGroupComponent],
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
