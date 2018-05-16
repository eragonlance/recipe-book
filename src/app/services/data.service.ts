import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  saveRecipes(token: string, recipes: Recipe[]): Observable<Object> {
    return this.http.put(
      'https://recipe-book-eragonlance.firebaseio.com/recipes.json?auth=' + token,
      recipes
    );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('https://recipe-book-eragonlance.firebaseio.com/recipes.json')
      .map(recipes =>
        recipes.map(recipe => {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
          return recipe;
        })
      );
  }
}
