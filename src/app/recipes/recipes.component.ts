import { Utility } from './../shared/utilities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.styl']
})
export class RecipesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    Utility.headerTitle.next('Recipes');
    this.recipeService.setRecipes(this.activatedRoute.snapshot.data['recipes']);
  }
}
