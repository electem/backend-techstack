import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { UserComponent } from './user/user.component'
import { ModuleModule } from './module/module.module'
@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
