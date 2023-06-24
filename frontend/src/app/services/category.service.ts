import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category.model";
import {Ingredient} from "../models/ingredient.model";

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

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedCategories = JSON.parse(sessionStorage.getItem('categories'));
    this._categories = new BehaviorSubject<Category[]>(savedCategories);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Category[]>(environment.apiUrl + 'categories')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `categories/${id}`);
  }

  public create(name: string): Observable<Category> {
    return this.http.post<Category>(environment.adminApiUrl + 'categories', {name});
  }
}
