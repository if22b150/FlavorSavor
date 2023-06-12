import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {Category} from "../../../models/category.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../services/breadcrumb.service";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[];
  recipesLoading: boolean;
  @Input() isMyRecipes: boolean;

  constructor(public recipeService: RecipeService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {

  }

  ngOnInit() {
  }

  navigateToRecipe(recipe: Recipe) {
    this.breadcrumbService.breadcrumb = this.isMyRecipes ? {link: '/my-recipes', text: 'Meine Rezepte'} : {link: '/recipes', text: 'Alle Rezepte'};
  }

  getCategorySeverity (category: Category) {
    switch (category.name) {
      case 'Low Carb':
        return 'warning';
      case 'Proteinreich':
        return 'warning';
      // case 'LOWSTOCK':
      //   return 'warning';
      //
      // case 'OUTOFSTOCK':
      //   return 'danger';

      default:
        return null;
    }
  };

  getDashSeperatedTitle(recipe: Recipe) {
    return '/recipes/' + recipe.title.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase() + '-' + recipe.id;
  }

}
