import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersInterceptor } from './headers.interceptor';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { CompanylistingComponent } from './components/companylisting/companylisting.component';
import { CreatedepartmentComponent } from './components/createdepartment/createdepartment.component';
import { DepartmentlistingComponent } from './components/departmentlisting/departmentlisting.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { EditdepartmentComponent } from './components/editdepartment/editdepartment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { AuthService } from './auth/auth.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

export function jwtOptionFactor() {
  return {
    allowedDomains: ['localhost:3000'],
    disallowedRoutes: ['http://localhost:3000/auth/login'],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LogincomponentComponent,
    CreatecompanyComponent,
    CompanylistingComponent,
    CreatedepartmentComponent,
    DepartmentlistingComponent,
    EditcompanyComponent,
    EditdepartmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionFactor,
        deps: [AuthService],
      },
    }),
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
