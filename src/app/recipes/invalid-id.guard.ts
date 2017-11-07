import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvalidIdGuard implements CanActivateChild {
  constructor(private router: Router, private recipeService: RecipeService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (route.url[0].path === 'new') {
      return true;
    }

    if (!this.recipeService.getRecipe(+route.params['id'])) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
