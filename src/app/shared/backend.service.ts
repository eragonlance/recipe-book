import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    console.log(this.recipeService.getRecipes());
    this.http
      .put(
        'https://recipe-book-eragonlance.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe(
        res => {
          console.log(res);
        },
        error => console.log(error)
      );
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://recipe-book-eragonlance.firebaseio.com/recipes.json')
      .map(recipes =>
        recipes.map(recipe => {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
          return recipe;
        })
      )
      .subscribe(
        recipes => {
          this.recipeService.addRecipes(recipes);
        },
        error => {
          console.log(error);
        }
      );
  }
}
