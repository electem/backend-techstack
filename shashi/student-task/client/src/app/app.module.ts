import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { CreateSchoolComponent } from './components/create-school/create-school.component';
import { SchoolListingComponent } from './components/school-listing/school-listing.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { DatepickerModule } from 'ng2-datepicker';
import { TeacherListingComponent } from './components/teacher-listing/teacher-listing.component';
import { StudentListingComponent } from './components/student-listing/student-listing.component';
import { FileUploadDownloadComponent } from './components/file-upload-download/file-upload-download.component';
//import { ChartSchoolTeacherComponent } from './components/chart-school-teacher/chart-school-teacher.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateSchoolComponent,
    SchoolListingComponent,
    CreateTeacherComponent,
    CreateStudentComponent,
    TeacherListingComponent,
    StudentListingComponent,
    FileUploadDownloadComponent,
    DashBoardComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DatepickerModule,
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
