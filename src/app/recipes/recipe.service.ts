import { Subject } from 'rxjs/Subject';
import { ShoppingService } from './../shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Beef Stew',
      'Just a test',
      'http://www.seriouseats.com/images/2017/02/20170228-pressure-cooker-recipes-roundup-09.jpg',
      [new Ingredient('Lean beef', 5), new Ingredient('Potatoes', 12)]
    ),
    new Recipe(
      'Fondue',
      'Fondue is a Swiss condiment of melted cheese served in a communal pot (caquelon or fondue pot) over a portable stove (réchaud) heated with a candle or spirit lamp, and eaten by dipping bread into the cheese using long-stemmed forks.',
      'https://images-gmi-pmc.edge-generalmills.com/925f6a1e-d9f4-48ef-980f-344caa080558.jpg',
      [new Ingredient('Cottage cheese', 20), new Ingredient('Bread', 35)]
    ),
    new Recipe(
      'FondueA',
      'Fondue is a Swiss condiment of melted cheese served in a communal pot (caquelon or fondue pot) over a portable stove (réchaud) heated with a candle or spirit lamp, and eaten by dipping bread into the cheese using long-stemmed forks.',
      'https://images-gmi-pmc.edge-generalmills.com/925f6a1e-d9f4-48ef-980f-344caa080558.jpg',
      [new Ingredient('Cottage cheese', 20), new Ingredient('Bread', 35)]
    ),
    new Recipe(
      'FondueB',
      'Fondue is a Swiss condiment of melted cheese served in a communal pot (caquelon or fondue pot) over a portable stove (réchaud) heated with a candle or spirit lamp, and eaten by dipping bread into the cheese using long-stemmed forks.',
      'https://images-gmi-pmc.edge-generalmills.com/925f6a1e-d9f4-48ef-980f-344caa080558.jpg',
      [new Ingredient('Cottage cheese', 20), new Ingredient('Bread', 35)]
    )
  ];
  recipesRefChanged = new Subject<void>();

  constructor(private shoppingService: ShoppingService) {}

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeIndex(recipe: Recipe): number {
    return this.recipes.indexOf(recipe);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  addRecipes(recipes: Recipe[]) {
    recipes.forEach(recipe => this.recipes.push(recipe));
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesRefChanged.next();
  }

  updateRecipe(id: number, recipe: Recipe): boolean {
    this.recipes[id] = recipe;
    return true;
  }

  removeRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  removeAll() {
    this.recipes.length = 0;
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingService.addIng(...recipe.ingredients);
  }
}
