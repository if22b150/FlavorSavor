import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FrontendRoutingModule} from "./frontend-routing.module";
import {FrontendComponent} from "./frontend.component";
import { RecipesViewComponent } from './views/recipes-view/recipes-view.component';
import {PrimeNgModule} from "../shared/modules/primeNg.module";



@NgModule({
  declarations: [
    FrontendComponent,
    RecipesViewComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    PrimeNgModule
  ]
})
export class FrontendModule { }
