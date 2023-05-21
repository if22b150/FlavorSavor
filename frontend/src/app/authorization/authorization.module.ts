import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationRoutingModule} from "./authorization-routing.module";
import {LoginViewComponent} from "./views/login-view/login-view.component";



@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
