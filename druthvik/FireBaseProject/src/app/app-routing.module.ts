import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentComponent } from './components/component/component.component';
import { TeacherlistingComponent } from './components/teacherlisting/teacherlisting.component';
import { TeachereditComponent } from './components/teacheredit/teacheredit.component';
const routes: Routes = [
  { path: '', redirectTo: 'teacherlisting', pathMatch: 'full' },
  { path: 'teacher', component: ComponentComponent },
  { path: 'teacherlisting', component: TeacherlistingComponent },
  { path: 'teacher/:key', component: TeachereditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
