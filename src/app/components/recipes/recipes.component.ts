import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { Utils } from 'app/shared/utils';
import { routeTransition } from 'app/shared/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.styl'],
  animations: [routeTransition]
})
export class RecipesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    Utils.headerTitle.next('Recipes');
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
