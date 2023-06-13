import {Ingredient} from "./ingredient.model";
import {AModel} from "./a-model.model";
import {User} from "./user.model";
import {RecipeIngredient} from "./recipe-ingredient.model";

export interface Recipe extends AModel{
  title: string;
  description: string;
  imagePath: string;
  time: number;
  servings: number;

  user: User;
  ingredients: RecipeIngredient[];
  categories: Ingredient[];
  saved?: boolean;
}
