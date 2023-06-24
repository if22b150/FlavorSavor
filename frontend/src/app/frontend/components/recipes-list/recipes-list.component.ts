import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {Category} from "../../../models/category.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {AuthService} from "../../../services/auth/auth.service";
import {CookbookService} from "../../../services/cookbook.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[];
  recipesLoading: boolean;
  @Input() isMyRecipes: boolean = false;
  @Input() isSavedRecipes: boolean = false;

  constructor(public recipeService: RecipeService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              public authService: AuthService) {

  }

  ngOnInit() {
  }

  isMyRecipe(id: number) {
    return this.authService.user.id == id;
  }

  navigateToRecipe(recipe: Recipe) {
    this.breadcrumbService.breadcrumb = this.isMyRecipes ? {link: '/my-recipes', text: 'Meine Rezepte'} : (this.isSavedRecipes ? {link: '/cookbook', text: 'Mein Kochbuch'} : {link: '/recipes', text: 'Alle Rezepte'});
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
