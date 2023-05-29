import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../models/recipe.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.apiUrl + 'recipes');
  }
}
