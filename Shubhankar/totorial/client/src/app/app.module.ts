import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { StudentComponent } from './components/student/student.component'
import { CourceComponent } from './components/cource/cource.component'
import { CourceListComponent } from './components/cource-list/cource-list.component'
import { DemoListComponent } from './components/demo-list/demo-list.component'
import { StudentDetailsComponent } from './student-details/student-details.component'
import { CourceDetailsComponent } from './components/cource-details/cource-details.component'
import { DemoDetailsComponent } from './components/demo-details/demo-details.component'
import { TestComponent } from './components/test/test.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { ProductComponent } from './components/product/product.component'
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersInterceptor } from './headers.interceptor';
import { TutorialDetailnewComponent } from './components/tutorial-detailnew/tutorial-detailnew.component';
import { CommentPostComponent } from './components/tutorial-detailnew/comment-post/comment-post.component'
import { StudentListComponent } from './components/student-list/student-list.component';
import { LoginComponent } from './components/login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    StudentComponent,
    CourceComponent,
    CourceListComponent,
    DemoListComponent,
    StudentDetailsComponent,
    CourceDetailsComponent,
    DemoDetailsComponent,
    TestComponent,
    ProductComponent,
   UserComponent,
    UserListComponent,
    StudentListComponent,
    EditStudentComponent,
      TutorialDetailnewComponent,
      CommentPostComponent,
      LoginComponent,
  
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
 
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
  }
 ],
  bootstrap: [AppComponent],
})
export class AppModule {}
