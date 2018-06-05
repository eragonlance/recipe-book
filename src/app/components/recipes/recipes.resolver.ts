import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { RecipesAction, RecipesState } from 'app/ngrx';

@Injectable()
export class RecipesResolver implements Resolve<RecipesState> {
  constructor(private store: Store<any>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RecipesState | Observable<RecipesState> | Promise<RecipesState> {
    let recipesState$ = this.store.select('recipesReducer').take(1);
    recipesState$.take(1).subscribe((recipesState: RecipesState) => {
      if (!recipesState) {
        this.store.dispatch(RecipesAction.fetchRecipes());
        recipesState$ = this.store.select('recipesReducer').take(2);
      }
    });
    return recipesState$;
  }
}
