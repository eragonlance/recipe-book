import { Injectable } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs/Observable';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private backendService: BackendService, private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.backendService.recipesFetched
      ? this.recipeService.getRecipes()
      : this.backendService.fetchRecipes();
  }
}
