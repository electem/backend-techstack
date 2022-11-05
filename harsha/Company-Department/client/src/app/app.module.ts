import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { FileUploadDownloadComponent } from './components/file-upload-download/file-upload-download.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authInterceptorProviders } from './auth.interceptor';
import { RegisterUserComponent } from './components/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCompanyComponent,
    CompanyListComponent,
    DepartmentListComponent,
    CreateDepartmentComponent,
    EditCompanyComponent,
    EditDepartmentComponent,
    FileUploadDownloadComponent,
    UserLoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
