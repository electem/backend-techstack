import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersInterceptor } from './headers.interceptor';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './auth/auth.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ChartComponent } from './components/chart/chart.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';

export function jwtOptionFactor() {
  return {
    allowedDomains: ['localhost:3000'],
    disallowedRoutes: ['http://localhost:3000/login'],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CompanylistComponent,
    CreatecompanyComponent,
    CreatedepartmentComponent,
    DepartmentlistComponent,
    EditcompanyComponent,
    EditdepartmentComponent,
    LoginComponent,
    ChartComponent,
    AdminpageComponent,
    SidenavComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
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
