import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {Recipe} from "../models/recipe.model";
import {environment} from "../../environments/environment";

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

  constructor(private http: HttpClient) {
    let savedRecipes = JSON.parse(sessionStorage.getItem('recipes'));
    this._recipes = new BehaviorSubject<{recipes: Recipe[], type: string}>(savedRecipes);
    this._loading = new BehaviorSubject<boolean>(false);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Recipe[]>(environment.apiUrl + 'recipes')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.recipes = {recipes: recipes, type: 'all'};
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
