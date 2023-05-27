import {Ingredient} from "./ingredient.model";
import {AModel} from "./a-model.model";

export interface Recipe extends AModel{
  title: string;
  description: string;
  imagePath: string;
  time: number;
  servings: number;

  ingredients: Ingredient[];
  categories: Ingredient[];
}
