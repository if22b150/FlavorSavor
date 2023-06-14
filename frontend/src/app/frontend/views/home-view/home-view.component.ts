import { Component } from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {Observable} from "rxjs";
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {
  search: any;
  suggestionRecipes: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService,
              private breadcrumbService: BreadcrumbService) {
  }

  filterCountry(event) {
    this.suggestionRecipes = this.recipeService.getSearch(event.query);
  }

  getDashSeperatedTitle(recipe: Recipe) {
    return '/recipes/' + recipe.title.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase() + '-' + recipe.id;
  }

  navigateToRecipe() {
    this.breadcrumbService.breadcrumb = {link: '/home', text: 'Home'};
  }
}
