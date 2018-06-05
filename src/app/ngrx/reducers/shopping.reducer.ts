import { Ingredient } from 'app/models';
import { ShoppingAction } from 'app/ngrx/actions';
import { Utils } from 'app/shared/utils';

const initialState: ShoppingState = {
  ingredients: [new Ingredient('Flour', 10), new Ingredient('Chicken thigh', 35)]
};

export function shoppingReducer(state: ShoppingState = initialState, action): ShoppingState {
  switch (action.type) {
    case ShoppingAction.ADD_INGREDIENT:
      return {
        ingredients: addIngredients(state.ingredients, action.payload)
      };

    case ShoppingAction.UPDATE_INGREDIENT:
      return {
        ingredients: Utils.immutableSplice(
          state.ingredients,
          state.ingredients.findIndex(ing => ing.name === action.payload.name),
          1,
          action.payload
        )
      };

    case ShoppingAction.REMOVE_INGREDIENT:
      return {
        ingredients: state.ingredients.filter(ing => ing.name !== action.payload)
      };

    case ShoppingAction.REMOVE_ALL:
      return { ingredients: [] };

    default:
      return state;
  }
}

export interface ShoppingState {
  ingredients: Ingredient[];
}

function addIngredients(currentList: Ingredient[], ings: Ingredient[]): Ingredient[] {
  const newList = currentList.map(ing => Ingredient.clone(ing));

  ings.forEach((ing: Ingredient) => {
    const idx = newList.findIndex((eIng: Ingredient) => eIng.name === ing.name);
    if (idx !== -1) {
      newList[idx].amount += ing.amount;
    } else {
      newList.push(ing);
    }
  });

  return newList;
}
