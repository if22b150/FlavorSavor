import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FrontendRoutingModule} from "./frontend-routing.module";
import {FrontendComponent} from "./frontend.component";
import { RecipesViewComponent } from './views/recipes-view/recipes-view.component';
import {PrimeNgModule} from "../shared/modules/primeNg.module";
import {ButtonModule} from "primeng/button";
import { CookbookViewComponent } from './views/cookbook-view/cookbook-view.component';
import { AccountViewComponent } from './views/account-view/account-view.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';



@NgModule({
  declarations: [
    FrontendComponent,
    RecipesViewComponent,
    CookbookViewComponent,
    AccountViewComponent,
    RecipesListComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    PrimeNgModule,
    ButtonModule
  ]
})
export class FrontendModule { }
