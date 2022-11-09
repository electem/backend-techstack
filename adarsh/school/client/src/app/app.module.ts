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

@NgModule({
  declarations: [
    AppComponent,
    SchoolListingComponent,
    AddSchoolComponent,
    TeacherListingComponent,
    AddTeachersComponent,
    

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
     
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
