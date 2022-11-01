import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserloginComponent } from '../app/components/userlogin/userlogin.component';
import { RegisteruserComponent } from '../app/components/registeruser/registeruser.component';
import { CreatecustomerComponent } from '../app/components/createcustomer/createcustomer.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { CustomereditComponent } from './components/customeredit/customeredit.component';
import { CustomergrouplistComponent } from './components/customergrouplist/customergrouplist.component';
import { EditcustomergroupComponent } from './components/editcustomergroup/editcustomergroup.component';
import { AddcustomergroupComponent } from './components/addcustomergroup/addcustomergroup.component';
import { GameplayerComponent } from './components/gameplayer/gameplayer.component';
import { EditgameplayerComponent } from './components/editgameplayer/editgameplayer.component';
const routes: Routes = [
  { path: '', redirectTo: 'registeruser', pathMatch: 'full' },
  { path: 'loginuser', component: UserloginComponent },
  { path: 'registeruser', component: RegisteruserComponent },
  { path: 'createcustomer', component: CreatecustomerComponent },
  { path: 'customerlist', component: CustomerlistComponent },
  { path: 'customeredit/:id', component: CustomereditComponent },
  { path: 'customergroup', component: CustomergrouplistComponent },
  { path: 'addcustomergroup', component: AddcustomergroupComponent },
  { path: 'customergroupedit/:id', component: EditcustomergroupComponent },
  { path: 'game', component: GameplayerComponent },
  { path: 'game/:id', component: EditgameplayerComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
