import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {finalize} from "rxjs";
import {RecipeService} from "../../../services/recipe.service";
import {Recipe} from "../../../models/recipe.model";

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss']
})
export class RecipesViewComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService,
              public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb = null;

    if(!this.recipeService.recipes || this.recipeService.recipes.recipes.length == 0 || this.recipeService.recipes.type == 'customer')
      this.recipeService.getAllFiltered();
  }

}
