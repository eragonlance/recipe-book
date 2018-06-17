import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { Recipe } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  saveRecipes(token: string, recipes: Recipe[]): Observable<Object> {
    return this.http.put(
      'https://recipe-book-eragonlance.firebaseio.com/recipes.json?auth=' + token,
      recipes.reduce((recipesObj, recipe) => {
        recipesObj[recipe.id] = recipe;
        return recipesObj;
      }, {})
    );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Object>('https://recipe-book-eragonlance.firebaseio.com/recipes.json')
      .map(recipesObj => Object.values(recipesObj));
  }
}
