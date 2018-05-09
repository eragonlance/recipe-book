import { Recipe } from '../../recipes/recipe.model';
import { RecipesAction } from '../actions/recipes.action';
import { Utils } from '../../shared/utils';

const initialState: RecipesState = {
  recipes: [],
  pending: false,
  error: null
};

export function recipesReducer(state: RecipesState = initialState, action) {
  switch (action.type) {
    case RecipesAction.FETCH_RECIPES:
      return { ...state, pending: true, error: null };
    case RecipesAction.FETCH_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload, pending: false };
    case RecipesAction.FETCH_RECIPES_ERROR:
      return { ...state, pending: false, error: action.payload };
    case RecipesAction.REMOVE_RECIPE:
      return {
        recipes: Utils.spliceReturnNewArray(
          state.recipes,
          state.recipes.findIndex((recipe: Recipe) => recipe.id === action.payload),
          1
        ),
        pending: false,
        error: null
      };
  }
}

export interface RecipesState {
  recipes: Recipe[];
  pending: boolean;
  error?: string;
}
