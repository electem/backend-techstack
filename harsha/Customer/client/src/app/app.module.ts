import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerGroupComponent } from './components/customer-group/customer-group.component';
import { CustomerGroupListingComponent } from './components/customer-group-listing/customer-group-listing.component';
import { EditCustomerGroupComponent } from './components/edit-customer-group/edit-customer-group.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    CustomerComponent,
    CustomerGroupComponent,
    CustomerGroupListingComponent,
    EditCustomerGroupComponent,
    CustomerListComponent,
    EditCustomerComponent,
    GamesListComponent,
    EditGameComponent,
  ],
  imports: [
    NgxDatatableModule,
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
