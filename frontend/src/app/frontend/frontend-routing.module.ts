import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontendComponent} from "./frontend.component";
import {RecipesViewComponent} from "./views/recipes-view/recipes-view.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {path: 'recipes', component: RecipesViewComponent},
      {path: '', redirectTo: 'recipes'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
