import {Component, Input} from '@angular/core';
import {RecipeIngredient} from "../../../models/recipe-ingredient.model";

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent {
  @Input() recipeIngredients: RecipeIngredient[];

}
