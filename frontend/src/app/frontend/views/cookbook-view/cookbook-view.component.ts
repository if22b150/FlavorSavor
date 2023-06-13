import { Component } from '@angular/core';
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {AuthService} from "../../../services/auth/auth.service";
import {CookbookService} from "../../../services/cookbook.service";

@Component({
  selector: 'app-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent {
  recipes: Recipe[];

  constructor(private breadcrumbService: BreadcrumbService,
              public recipeService: RecipeService,
              public cookbookService: CookbookService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb = null;

    if(!this.cookbookService.savedRecipes || this.cookbookService.savedRecipes.length == 0)
      this.cookbookService.getAll();
  }
}
