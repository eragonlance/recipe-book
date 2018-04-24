import { Utility } from './../shared/utilities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecipeService } from './recipe.service';
import { routeTransition } from '../shared/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.styl'],
  animations: [routeTransition]
})
export class RecipesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    Utility.headerTitle.next('Recipes');
    this.recipeService.setRecipes(this.activatedRoute.snapshot.data['recipesState'].recipes);
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
