import { Recipe } from './recipes/recipe.model';
import { BackendService } from './shared/backend.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { routeTransition } from './shared/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [routeTransition]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private backendService: BackendService, private recipeService: RecipeService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.backendService.fetchRecipes().subscribe(recipes => this.recipeService.setRecipes(recipes));
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
