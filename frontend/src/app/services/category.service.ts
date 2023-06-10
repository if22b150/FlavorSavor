import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Ingredient} from "../models/ingredient.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  _categories: BehaviorSubject<Category[]>;

  public get categories$(): Observable<Category[]> {
    return this._categories.asObservable();
  }
  public get categories(): Category[] {
    return this._categories.value;
  }
  public set categories(categories: Category[]) {
    sessionStorage.setItem('categories', JSON.stringify(categories));
    this._categories.next(categories);
  }

  constructor(private http: HttpClient) {
    let savedCategories = JSON.parse(sessionStorage.getItem('categories'));
    this._categories = new BehaviorSubject<Category[]>(savedCategories);
  }

  public getAll() {
    this.http.get<Category[]>(environment.apiUrl + 'categories')
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
  }
}
