import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationRoutingModule} from "./authorization-routing.module";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../shared/modules/primeNg.module";
import {BtnLoadingDirective} from "../shared/directives/btn-loading.directive";
import { SignupViewComponent } from './views/signup-view/signup-view.component';



@NgModule({
  declarations: [
    LoginViewComponent,
    SignupViewComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class AuthorizationModule { }
