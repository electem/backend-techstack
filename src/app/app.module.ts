﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { MenuComponent } from './menu/menu/menu.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { StudentComponent } from './components/student/student.component';
import {MatTableModule} from '@angular/material/table'
import { LoginComponent } from './components/login/login.component';
import { SemesterComponent } from './components/semester/semester.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StudentListComponent } from './components/student-list/student-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TestJsonComponent } from './components/test-json/test-json.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        MenuComponent,
        AddTutorialComponent ,
        TutorialDetailsComponent ,
        TutorialsListComponent ,
        EmployeeComponent ,
        EditEmployeeComponent,
        MessageBoxComponent,
        StudentComponent,
        LoginComponent,
        SemesterComponent,
        StudentListComponent,
        TestJsonComponent,
        DynamicTableComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
})
export class AppModule { };