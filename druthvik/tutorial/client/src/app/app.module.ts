import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { HeadersInterceptor } from './headers.interceptor';
import { FormTutorialComponent } from './components/form-tutorial/form-tutorial.component';
import { ValidationComponent } from './components/validation/validation.component';
import { CommentPostComponent } from './components/tutorial-detial-view/comment-post/comment-post.component';
import { TutorialDetialViewComponent } from './components/tutorial-detial-view/tutorial-detial-view.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
@NgModule({
  declarations: [
    LoginComponentComponent,
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    FormTutorialComponent,
    ValidationComponent,
    CommentPostComponent,
    TutorialDetialViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
