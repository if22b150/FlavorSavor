import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontendComponent} from "./frontend.component";
import {RecipesViewComponent} from "./views/recipes-view/recipes-view.component";
import {CookbookViewComponent} from "./views/cookbook-view/cookbook-view.component";
import {AccountViewComponent} from "./views/account-view/account-view.component";
import {UserGuard} from "../guards/user.guard";
import {RecipeViewComponent} from "./views/recipe-view/recipe-view.component";
import {MyRecipesViewComponent} from "./views/my-recipes-view/my-recipes-view.component";
import {HomeViewComponent} from "./views/home-view/home-view.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {path: 'home', component: HomeViewComponent},
      {path: 'recipes', component: RecipesViewComponent},
      {path: 'recipes/:recipeUrl', component: RecipeViewComponent},
      {path: 'cookbook', component: CookbookViewComponent, canActivate: [UserGuard]},
      {path: 'my-recipes', component: MyRecipesViewComponent, canActivate: [UserGuard]},
      {path: 'account', component: AccountViewComponent, canActivate: [UserGuard]},
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
