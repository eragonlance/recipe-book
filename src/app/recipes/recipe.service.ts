import { Subject } from 'rxjs/Subject';
import { ShoppingService } from './../shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
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

  get length(): number {
    return this.recipes.length;
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
