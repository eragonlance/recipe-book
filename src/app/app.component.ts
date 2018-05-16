import { Recipe } from './recipes/recipe.model';
import { DataService } from './services/data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routeTransition } from './shared/animations';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipesAction } from './ngrx/actions/recipes.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [routeTransition]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.store.dispatch(RecipesAction.fetchRecipes());
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
