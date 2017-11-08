import { Observable } from 'rxjs/Observable';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RecipeIdResolver implements Resolve<Recipe> {
  constructor(private router: Router, private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe | Observable<Recipe> | Promise<Recipe> {
    const recipe = this.recipeService.getRecipe(+route.params['id']);

    if (!recipe) {
      this.router.navigate(['/error']);
      return null;
    }

    return recipe;
  }
}
