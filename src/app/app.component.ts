import { Recipe } from './recipes/recipe.model';
import { BackendService } from './shared/backend.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private backendService: BackendService, private recipeService: RecipeService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.backendService.recipesFetched) {
      this.backendService.recipesFetched = true;
      this.backendService
        .fetchRecipes()
        .subscribe((recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
    }
  }
}
