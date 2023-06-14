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
import { RecipeViewComponent } from './views/recipe-view/recipe-view.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { MyRecipesViewComponent } from './views/my-recipes-view/my-recipes-view.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CookbookStarComponent } from './components/cookbook-star/cookbook-star.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeViewComponent } from './views/home-view/home-view.component';



@NgModule({
  declarations: [
    FrontendComponent,
    RecipesViewComponent,
    CookbookViewComponent,
    AccountViewComponent,
    RecipesListComponent,
    RecipeViewComponent,
    CategoriesListComponent,
    LoadingSpinnerComponent,
    IngredientsTableComponent,
    MyRecipesViewComponent,
    CreateRecipeComponent,
    CookbookStarComponent,
    EditRecipeComponent,
    HomeViewComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    PrimeNgModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FrontendModule { }
