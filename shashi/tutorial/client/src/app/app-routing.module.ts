import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialTaskComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { FormComponent } from './components/form/form.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { Bootstrap2Component } from './bootstrap2/bootstrap2.component';
import { TutorialDetialViewComponent } from './components/tutorial-detail-view/tutorial-detail-view.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'tutorials', component: TutorialTaskComponent },
  { path: 'tutorials/:id', component: AddTutorialComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'form', component: FormComponent },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'bootstrap2', component: Bootstrap2Component },
  { path: 'tutorialdetailview/:id', component: TutorialDetialViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
