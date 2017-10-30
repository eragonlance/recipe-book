import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  saveRecipes() {
    console.log(this.recipeService.getRecipes());
    this.http.put('http://localhost:3000/quotes', this.recipeService.getRecipes()).subscribe((res: Response) => {
      console.log(res.json());
    });
  }

  fetchRecipes() {
    return this.http.get('http://localhost:3000/get-recipes').do((res: Response) => {
      this.recipeService.removeAll();
      res.json().forEach(x => {
        this.recipeService.addRecipe(x);
      });
      console.log(this.recipeService.getRecipes());
    });
  }
}
