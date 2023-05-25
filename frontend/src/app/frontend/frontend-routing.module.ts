import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontendComponent} from "./frontend.component";
import {RecipesViewComponent} from "./views/recipes-view/recipes-view.component";
import {CookbookViewComponent} from "./views/cookbook-view/cookbook-view.component";
import {AccountViewComponent} from "./views/account-view/account-view.component";
import {UserGuard} from "../guards/user.guard";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {path: 'recipes', component: RecipesViewComponent},
      {path: 'cookbook', component: CookbookViewComponent, canActivate: [UserGuard]},
      {path: 'account', component: AccountViewComponent, canActivate: [UserGuard]},
      {path: '', redirectTo: '/recipes', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
