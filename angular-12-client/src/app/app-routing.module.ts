import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { TutorialComponent } from './tutorial/tutorial.component'
import { LoginComponent } from './login/login.component'
import { UserlistComponent } from './userlist/userlist.component'

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userlist', component: UserlistComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
