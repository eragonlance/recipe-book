import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipesAction } from 'app/ngrx';
import { routeTransition } from 'app/shared/animations';

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
