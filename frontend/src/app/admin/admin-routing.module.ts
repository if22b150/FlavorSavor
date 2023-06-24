import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UsersViewComponent} from "./views/users-view/users-view.component";
import {RecipesAdminViewComponent} from "./views/recipes-admin-view/recipes-admin-view.component";
import {CategoriesViewComponent} from "./views/categories-view/categories-view.component";
import {IngredientsViewComponent} from "./views/ingredients-view/ingredients-view.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'users', component: UsersViewComponent},
      {path: 'recipes', component: RecipesAdminViewComponent},
      {path: 'ingredients', component: IngredientsViewComponent},
      {path: 'categories', component: CategoriesViewComponent},
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
