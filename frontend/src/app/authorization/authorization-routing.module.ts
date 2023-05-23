import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginViewComponent} from "./views/login-view/login-view.component";

const routes: Routes = [
  {path: 'login', component: LoginViewComponent},
  {path: '', redirectTo: 'login', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
