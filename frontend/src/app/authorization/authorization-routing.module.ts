import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {SignupViewComponent} from "./views/signup-view/signup-view.component";

const routes: Routes = [
  {path: 'login', component: LoginViewComponent},
  {path: 'signup', component: SignupViewComponent},
  {path: '', redirectTo: 'login', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
