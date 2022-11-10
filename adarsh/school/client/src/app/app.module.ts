import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
import { AddSchoolComponent } from './components/add-school/add-school.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TeacherListingComponent } from './components/teacher-listing/teacher-listing.component';
import { AddTeachersComponent } from './components/add-teachers/add-teachers.component';
import { StudentListingComponent } from './components/student-listing/student-listing.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AuthInterceptor } from 'src/helpers/auth.interceptor';
import { LoginUserComponent } from './components/login-user/login-user.component';


@NgModule({
  declarations: [
    AppComponent,
    SchoolListingComponent,
    AddSchoolComponent,
    TeacherListingComponent,
    AddTeachersComponent,
    StudentListingComponent,
    AddStudentComponent,
    LoginUserComponent
    
    

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
