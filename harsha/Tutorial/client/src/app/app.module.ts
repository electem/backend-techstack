import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule , ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { StudentComponent } from './components/student/student.component'
import { CourceComponent } from './components/cource/cource.component'
import { StudentListComponent } from './components/student-list/student-list.component'
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
import { NewTutorialComponent } from './components/new-tutorial/new-tutorial.component';
import { StudentformComponent } from './components/studentform/studentform.component';
import { EditStudentFormComponent } from './components/edit-student-form/edit-student-form.component';
import { ComponentsComponent } from './components/components/components.component';
import { CommentPostComponent } from './components/tutorial-details-new/comment-post/comment-post.component';
import { TutorialDetailsNewComponent } from './components/tutorial-details-new/tutorial-details-new.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    StudentComponent,
    CourceComponent,
    StudentListComponent,
    CourceListComponent,
    DemoListComponent,
    StudentDetailsComponent,
    CourceDetailsComponent,
    DemoDetailsComponent,
    TestComponent,
    ProductComponent,
    UserComponent,
    UserListComponent,
    NewTutorialComponent,
    StudentformComponent,
    EditStudentFormComponent,
    ComponentsComponent,
    CommentPostComponent,
    TutorialDetailsNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
