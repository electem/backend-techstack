import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authInterceptorProviders } from './auth.interceptor';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    RegisterUserComponent,
    CreateSchoolComponent,
    SchoolListComponent,
    TeacherListComponent,
    StudentListComponent,
    CreateTeacherComponent,
    CreateStudentComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
