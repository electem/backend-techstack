import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { CustomergroupComponent } from './components/customergroup/customergroup.component';
import { AddcustomergroupComponent } from './components/addcustomergroup/addcustomergroup.component';
import { EditcustomergroupComponent } from './components/editcustomergroup/editcustomergroup.component';
import { EditcustomerComponent } from './components/editcustomer/editcustomer.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, AddcustomerComponent, CustomerlistComponent, CustomergroupComponent, AddcustomergroupComponent, EditcustomergroupComponent, EditcustomerComponent],
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
