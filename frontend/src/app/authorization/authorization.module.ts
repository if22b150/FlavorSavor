import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationRoutingModule} from "./authorization-routing.module";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../shared/modules/primeNg.module";
import {BtnLoadingDirective} from "../shared/directives/btn-loading.directive";



@NgModule({
  declarations: [
    LoginViewComponent
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
