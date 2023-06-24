import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersViewComponent } from './views/users-view/users-view.component';
import {PrimeNgModule} from "../shared/modules/primeNg.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {DeleteUserComponent} from "./views/users-view/delete-user/delete-user.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import { RecipesAdminViewComponent } from './views/recipes-admin-view/recipes-admin-view.component';
import {DeleteRecipeComponent} from "./views/recipes-admin-view/delete-recipe/delete-recipe.component";
import { IngredientsViewComponent } from './views/ingredients-view/ingredients-view.component';
import { CategoriesViewComponent } from './views/categories-view/categories-view.component';
import {DeleteIngredientComponent} from "./views/ingredients-view/delete-ingredient/delete-ingredient.component";
import {DeleteCategoryComponent} from "./views/categories-view/delete-category/delete-category.component";
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminComponent,
    UsersViewComponent,
    DeleteUserComponent,
    DeleteRecipeComponent,
    LoadingSpinnerComponent,
    RecipesAdminViewComponent,
    IngredientsViewComponent,
    CategoriesViewComponent,
    DeleteIngredientComponent,
    DeleteCategoryComponent,
    CreateIngredientComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
