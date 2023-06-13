import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {Recipe} from "../models/recipe.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CookbookService {
  _savedRecipes: BehaviorSubject<Recipe[]>;
  public get savedRecipes$(): Observable<Recipe[]> {
    return this._savedRecipes.asObservable();
  }
  public get savedRecipes(): Recipe[] {
    return this._savedRecipes.value;
  }
  public set savedRecipes(savedRecipes) {
    sessionStorage.setItem('cookbook', JSON.stringify(savedRecipes));
    this._savedRecipes.next(savedRecipes);
  }

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let sessionSavedRecipes = JSON.parse(sessionStorage.getItem('cookbook'));
    this._savedRecipes = new BehaviorSubject<Recipe[]>(sessionSavedRecipes);
    this._loading = new BehaviorSubject<boolean>(false);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Recipe[]>(environment.apiUrl + 'customer/saved-recipes')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (recipes) => {
          this.savedRecipes = recipes;
        }
      });
  }

  public add(id: number): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(environment.apiUrl + `customer/saved-recipes/${id}`, {});
  }

  public remove(id: number): Observable<Recipe[]> {
    return this.http.delete<Recipe[]>(environment.apiUrl + `customer/saved-recipes/${id}`);
  }
}
