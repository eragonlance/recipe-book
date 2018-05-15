import { Recipe } from './recipes/recipe.model';
import { DataService } from './services/data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routeTransition } from './shared/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [routeTransition]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
