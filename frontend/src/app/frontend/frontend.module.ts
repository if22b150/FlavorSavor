import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from '../authorization/views/login-view/login-view.component';
import {FrontendRoutingModule} from "./frontend-routing.module";
import {FrontendComponent} from "./frontend.component";
import { RecipesViewComponent } from './views/recipes-view/recipes-view.component';



@NgModule({
  declarations: [
    FrontendComponent,
    RecipesViewComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
  ]
})
export class FrontendModule { }
