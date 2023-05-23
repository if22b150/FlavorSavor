import { NgModule } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BtnLoadingDirective} from "../directives/btn-loading.directive";

@NgModule({
  declarations: [
    BtnLoadingDirective
  ],
  exports: [
    StyleClassModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    BtnLoadingDirective
  ]
})
export class PrimeNgModule { }
