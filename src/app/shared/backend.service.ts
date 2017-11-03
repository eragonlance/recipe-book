import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {
  recipesFetched = false;

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    console.log(this.recipeService.getRecipes());
    this.http
      .put(
        'https://recipe-book-eragonlance.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe(undefined, error => console.log(error));
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
      )
      .do(() => {
        this.recipesFetched = true;
      });
  }
}
