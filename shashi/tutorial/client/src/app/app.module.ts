import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialTaskComponent } from './components/tutorials-list/tutorials-list.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './App.interceptor';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { Bootstrap2Component } from './bootstrap2/bootstrap2.component';
import { TutorialCommentPost } from './components/tutorial-detail-view/tutorial-comment-post/tutorial-comment-post';
import { TutorialDetialViewComponent } from './components/tutorial-detail-view/tutorial-detail-view.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialTaskComponent,
    FormComponent,
    BootstrapComponent,
    Bootstrap2Component,
    TutorialDetialViewComponent,
    TutorialCommentPost,
    UserloginComponent,
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
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
