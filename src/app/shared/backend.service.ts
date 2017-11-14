import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {
  private prefetchedRecipes: Observable<Recipe[]>;

  constructor(private http: HttpClient) {
    this.fetchRecipes(true);
  }

  saveRecipes(token: string, recipes: Recipe[]): Observable<Object> {
    return this.http.put(
      'https://recipe-book-eragonlance.firebaseio.com/recipes.json?auth=' + token,
      recipes
    );
  }

  fetchRecipes(refresh = false): Observable<Recipe[]> {
    if (refresh) {
      this.prefetchedRecipes = this.http
        .get<Recipe[]>('https://recipe-book-eragonlance.firebaseio.com/recipes.json')
        .map(recipes =>
          recipes.map(recipe => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
            return recipe;
          })
        )
        .publishLast()
        .refCount();
    }
    return this.prefetchedRecipes;
  }
}
