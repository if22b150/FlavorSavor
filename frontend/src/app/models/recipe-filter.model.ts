import {Ingredient} from "./ingredient.model";
import {Category} from "./category.model";

export interface RecipeFilter {
  title?: string;
  ingredients: Ingredient[];
  categories: Category[];
}
