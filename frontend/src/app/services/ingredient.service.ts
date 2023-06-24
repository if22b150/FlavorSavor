import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
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

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedIngredients = JSON.parse(sessionStorage.getItem('ingredients'));
    this._ingredients = new BehaviorSubject<Ingredient[]>(savedIngredients);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Ingredient[]>(environment.apiUrl + 'ingredients')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `ingredients/${id}`);
  }

  public create(name: string): Observable<Ingredient> {
    return this.http.post<Ingredient>(environment.adminApiUrl + 'ingredients', {name});
  }
}
