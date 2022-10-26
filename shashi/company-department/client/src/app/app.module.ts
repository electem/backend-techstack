import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.interceptor';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

@NgModule({
  declarations: [AppComponent, CreateCompanyComponent, CreateDepartmentComponent, CompanyListComponent, DepartmentListComponent],
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
