import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.styl']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(public recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesRefChanged.subscribe(
      () => (this.recipes = this.recipeService.getRecipes())
    );
  }
}
