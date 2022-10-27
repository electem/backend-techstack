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
@NgModule({
  declarations: [
    AppComponent,
    CreatecompanyComponent,
    CompanylistingComponent,
    CreatedepartmentComponent,
    DepartmentlistingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
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
