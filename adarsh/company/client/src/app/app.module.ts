import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyLIstComponent } from './components/company-list/company-list.component';
import { AddCmpanyComponent } from './components/add-cmpany/add-cmpany.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { DepartmentListingComponent } from './components/department-listing/department-listing.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { AuthInterceptor } from 'src/helpers/auth.interceptor';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyLIstComponent,
    AddCmpanyComponent,
    EditCompanyComponent,
    DepartmentListingComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    LoginUserComponent,
    ChartComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
