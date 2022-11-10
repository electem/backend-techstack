import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersInterceptor } from './headers.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './components/login/login.component';
import { CreateschoolComponent } from './components/createschool/createschool.component';
import { SchoollistingComponent } from './components/schoollisting/schoollisting.component';
import { TeacherlistingComponent } from './components/teacherlisting/teacherlisting.component';
import { CreateteacherComponent } from './components/createteacher/createteacher.component';
import { CreatestudentComponent } from './components/createstudent/createstudent.component';
import { StudentlistComponent } from './components/studentlist/studentlist.component';

export function jwtOptionFactor() {
  return {
    allowedDomains: ['localhost:3000'],
    disallowedRoutes: ['http://localhost:3000/login'],
  };
}

@NgModule({
  declarations: [AppComponent, LoginComponent, CreateschoolComponent, SchoollistingComponent, TeacherlistingComponent, CreateteacherComponent, CreatestudentComponent, StudentlistComponent],
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
