import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Ingredient} from "../models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  _ingredients: BehaviorSubject<Ingredient[]>;

  public get ingredients$(): Observable<Ingredient[]> {
    return this._ingredients.asObservable();
  }
  public get ingredients(): Ingredient[] {
    return this._ingredients.value;
  }

  public set ingredients(ingredients: Ingredient[]) {
    sessionStorage.setItem('ingredients', JSON.stringify(ingredients));
    this._ingredients.next(ingredients);
  }

  constructor(private http: HttpClient) {
    let savedIngredients = JSON.parse(sessionStorage.getItem('ingredients'));
    this._ingredients = new BehaviorSubject<Ingredient[]>(savedIngredients);
  }

  public getAll() {
    this.http.get<Ingredient[]>(environment.apiUrl + 'ingredients')
      .subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
        }
      });
  }
}
