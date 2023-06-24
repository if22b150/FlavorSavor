import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Recipe} from "../../models/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  _recipes: BehaviorSubject<Recipe[]>;

  public get recipes$(): Observable<Recipe[]> {
    return this._recipes.asObservable();
  }
  public get recipes(): Recipe[] {
    return this._recipes.value;
  }

  public set recipes(recipes: Recipe[]) {
    this._recipes.next(recipes);
  }

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    this._recipes = new BehaviorSubject<Recipe[]>(null);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Recipe[]>(environment.adminApiUrl + 'recipes')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `recipes/${id}`);
  }
}
