import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { StudentComponent } from './components/student/student.component'
import { CourceComponent } from './components/cource/cource.component'
import { StudentListComponent } from './components/student-list/student-list.component'
import { CourceListComponent } from './components/cource-list/cource-list.component'
import { DemoListComponent } from './components/demo-list/demo-list.component'
import { StudentDetailsComponent } from './student-details/student-details.component'
import { CourceDetailsComponent } from './components/cource-details/cource-details.component'
import { DemoDetailsComponent } from './components/demo-details/demo-details.component'
import { TestComponent } from './components/test/test.component'
import { ProductComponent } from './components/product/product.component'
import { UserComponent } from './components/user/user.component'
import { UserListComponent } from './components/user-list/user-list.component'
import { NewTutorialComponent } from './components/new-tutorial/new-tutorial.component'
import { StudentformComponent } from './components/studentform/studentform.component'
import { EditStudentFormComponent } from './components/edit-student-form/edit-student-form.component'
import { ComponentsComponent } from './components/components/components.component'
import { TutorialDetailsNewComponent } from './components/tutorial-details-new/tutorial-details-new.component'

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'components', component: ComponentsComponent},
  { path: 'studentForm', component: StudentformComponent },
  { path: 'studentForm/:id', component: EditStudentFormComponent },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'tutorials-details/:id', component: TutorialDetailsNewComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'student', component: StudentComponent },
  { path: 'course', component: CourceComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'cource-list', component: CourceListComponent },
  { path: 'demo-list', component: DemoListComponent },
  { path: 'student/:id', component: StudentDetailsComponent },
  { path: 'cource/:id', component: CourceDetailsComponent },
  { path: 'demo-list/:id', component: DemoDetailsComponent },
  { path: 'test', component: TestComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'userListing', component: UserListComponent },
  { path: 'newTutorial/:id', component: NewTutorialComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
