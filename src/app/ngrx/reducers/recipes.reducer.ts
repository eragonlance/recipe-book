import { Recipe } from 'app/models';
import { RecipesAction } from 'app/ngrx/actions';
import { Utils } from 'app/shared/utils';

const initialState: RecipesState = {
  recipes: [],
  pending: false,
  error: null
};

export function recipesReducer(state: RecipesState = initialState, action): RecipesState {
  switch (action.type) {
    case RecipesAction.FETCH_RECIPES:
      return { ...state, pending: true, error: null };

    case RecipesAction.FETCH_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload, pending: false };

    case RecipesAction.FETCH_RECIPES_ERROR:
      return { ...state, pending: false, error: action.payload };

    case RecipesAction.ADD_RECIPE:
      return {
        recipes: [...state.recipes, action.payload],
        pending: false,
        error: null
      };

    case RecipesAction.EDIT_RECIPE:
      return {
        recipes: Utils.immutableSplice(
          state.recipes,
          state.recipes.findIndex(recipe => recipe.id === action.payload.id),
          1,
          action.payload
        ),
        pending: false,
        error: null
      };

    case RecipesAction.REMOVE_RECIPE:
      return {
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload),
        pending: false,
        error: null
      };

    default:
      return state;
  }
}

export interface RecipesState {
  recipes: Recipe[];
  pending: boolean;
  error?: string;
}
