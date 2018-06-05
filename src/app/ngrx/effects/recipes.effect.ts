import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Recipe } from 'app/models';
import { DataService } from 'app/services';
import { RecipesAction } from 'app/ngrx/actions';

@Injectable()
export class RecipesEffect {
  @Effect()
  fetchRecipes$ = this.actions$.ofType(RecipesAction.FETCH_RECIPES).switchMap(action =>
    this.dataService
      .fetchRecipes()
      .map((recipes: Recipe[]) => ({ type: RecipesAction.FETCH_RECIPES_SUCCESS, payload: recipes }))
      .catch(err => Observable.of({ type: RecipesAction.FETCH_RECIPES_ERROR, payload: err }))
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
