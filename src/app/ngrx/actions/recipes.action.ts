export class RecipesAction {
  static FETCH_RECIPES = 'FETCH_RECIPES';
  static FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
  static FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';
  static REMOVE_RECIPE = 'REMOVE_RECIPE';

  static fetchRecipes() {
    return { type: RecipesAction.FETCH_RECIPES };
  }

  static removeRecipe(id: number) {
    return { type: RecipesAction.REMOVE_RECIPE, payload: id };
  }
}
