import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UsersViewComponent} from "./views/users-view/users-view.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'users', component: UsersViewComponent},
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
