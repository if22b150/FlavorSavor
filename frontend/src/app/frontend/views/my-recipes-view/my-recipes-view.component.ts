import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-my-recipes-view',
  templateUrl: './my-recipes-view.component.html',
  styleUrls: ['./my-recipes-view.component.scss']
})
export class MyRecipesViewComponent implements OnInit {
  recipes: Recipe[];

  constructor(private breadcrumbService: BreadcrumbService,
              public recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb = null;

    if(!this.recipeService.recipes || this.recipeService.recipes.recipes.length == 0 || this.recipeService.recipes.type != 'customer')
      this.recipeService.getAllByCustomer(this.authService.user.id);
  }
}
