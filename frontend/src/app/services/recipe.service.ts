import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {Recipe} from "../models/recipe.model";
import {environment} from "../../environments/environment";
import {RecipeFilter} from "../models/recipe-filter.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  _recipes: BehaviorSubject<{recipes: Recipe[], type: string}>;
  public get recipes$(): Observable<{recipes: Recipe[], type: string}> {
    return this._recipes.asObservable();
  }
  public get recipes(): {recipes: Recipe[], type: string} {
    return this._recipes.value;
  }
  public set recipes(recipeData: {recipes: Recipe[], type: string}) {
    sessionStorage.setItem('recipes', JSON.stringify(recipeData));
    this._recipes.next(recipeData);
  }

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  private _filters: BehaviorSubject<RecipeFilter>;
  public get filters$(): Observable<RecipeFilter> {
    return this._filters.asObservable();
  }
  public get filters(): RecipeFilter {
    return this._filters.value;
  }
  public set filters(filters: RecipeFilter) {
    sessionStorage.setItem('filters', JSON.stringify(filters));
    this._filters.next(filters);
  }

  setRecipeSaved(id: number, saved: boolean) {
    let recipes = this._recipes.value.recipes;
    recipes.forEach(r => {
      if(r.id == id)
        r.saved = saved;
    })
    this.recipes = {recipes: recipes, type: this._recipes.value.type};
  }

  constructor(private http: HttpClient) {
    let savedRecipes = JSON.parse(sessionStorage.getItem('recipes'));
    let savedFilters = JSON.parse(sessionStorage.getItem('filters'));
    this._recipes = new BehaviorSubject<{recipes: Recipe[], type: string}>(savedRecipes);
    this._loading = new BehaviorSubject<boolean>(false);
    this._filters = new BehaviorSubject<RecipeFilter>(savedFilters);
  }

  public getAll(shadowLoad: boolean = false) {
    if(!shadowLoad)
      this._loading.next(true);
    this._loading.next(true);
    this.http.get<Recipe[]>(environment.apiUrl + 'recipes')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.recipes = {recipes: recipes, type: 'all'};
        }
      });
  }

  public getAllFiltered(shadowLoad: boolean = false) {
    if(!shadowLoad)
      this._loading.next(true);
    let title = this.filters ? (this.filters.title ?? '') : '';
    let ingredientIds = this.filters ? (this.filters.ingredients ? this.filters.ingredients.map(i => i.id).join() : []) : [];
    let categoryIds = this.filters ? (this.filters.categories ? this.filters.categories.map(i => i.id).join() : []) : [];

    this.http.get<Recipe[]>(environment.apiUrl + 'recipes',
      {params: {title: title, ingredients: ingredientIds, categories: categoryIds}})
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.recipes = {recipes: recipes, type: 'filtered'};
        }
      });
  }

  public getAllByCustomer(id: number) {
    this._loading.next(true);
    this.http.get<Recipe[]>(environment.apiUrl + 'customer/recipes')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.recipes = {recipes: recipes, type: 'customer'};
        }
      });
  }

  public getSearch(search: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.apiUrl + `recipes?title=${search}`);
  }

  public getOne(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(environment.apiUrl + `recipes/${id}`);
  }

  public create(data: FormData): Observable<Recipe> {
    return this.http.post<Recipe>(environment.apiUrl + 'customer/recipes', data, {headers: this._headers});
  }

  public update(id: number, data: FormData): Observable<Recipe> {
    // post because of formdata, not possible with put
    return this.http.post<Recipe>(environment.apiUrl + `customer/recipes/${id}`, data, {headers: this._headers});
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `customer/recipes/${id}`);
  }
}
