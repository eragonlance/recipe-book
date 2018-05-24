import { Ingredient } from '../../models/ingredient.model';
import { ShoppingAction } from '../actions/shopping.action';
import { Utils } from '../../shared/utils';
import { Recipe } from '../../models/recipe.model';

const initialState: ShoppingState = {
  ingredients: [new Ingredient('Flour', 10), new Ingredient('Chicken thigh', 35)]
};

export function shoppingReducer(state: ShoppingState = initialState, action): ShoppingState {
  switch (action.type) {
    case ShoppingAction.ADD_INGREDIENT:
      return {
        ingredients: [
          ...state.ingredients,
          ...action.payload.map((ing: Ingredient) => (ing = { ...ing }))
        ]
      };

    case ShoppingAction.UPDATE_INGREDIENT:
      return {
        ingredients: Utils.spliceReturnNewArray(
          state.ingredients,
          state.ingredients.findIndex((ing: Ingredient) => ing.name === action.payload.name),
          1,
          Ingredient.clone(action.payload)
        )
      };

    case ShoppingAction.REMOVE_INGREDIENT:
      return {
        ingredients: Utils.spliceReturnNewArray(
          state.ingredients,
          state.ingredients.findIndex((ing: Ingredient) => ing.name === action.payload),
          1
        )
      };

    default:
      return state;
  }
}

export interface ShoppingState {
  ingredients: Ingredient[];
}
