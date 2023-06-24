import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../../services/admin/recipe.service";

@Component({
  selector: 'app-recipes-admin-view',
  templateUrl: './recipes-admin-view.component.html',
  styleUrls: ['./recipes-admin-view.component.scss']
})
export class RecipesAdminViewComponent implements OnInit{
  constructor(public recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getAll();
  }
}
