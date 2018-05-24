import { Recipe } from '../../models/recipe.model';

export class RecipesAction {
  static FETCH_RECIPES = 'FETCH_RECIPES';
  static FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
  static FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';
  static ADD_RECIPE = 'ADD_RECIPE';
  static EDIT_RECIPE = 'EDIT_RECIPE';
  static REMOVE_RECIPE = 'REMOVE_RECIPE';

  static fetchRecipes() {
    return { type: RecipesAction.FETCH_RECIPES };
  }

  static addRecipe(recipe: Recipe) {
    return { type: RecipesAction.ADD_RECIPE, payload: recipe };
  }

  static editRecipe(recipe: Recipe) {
    return { type: RecipesAction.EDIT_RECIPE, payload: recipe };
  }

  static removeRecipe(id: number) {
    return { type: RecipesAction.REMOVE_RECIPE, payload: id };
  }
}
