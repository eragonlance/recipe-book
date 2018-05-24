import { Ingredient } from '../../models/ingredient.model';

export class ShoppingAction {
  static ADD_INGREDIENT = 'ADD_INGREDIENT';
  static UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
  static REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

  static addIngredient(...ings: Ingredient[]) {
    return { type: ShoppingAction.ADD_INGREDIENT, payload: ings };
  }

  static updateIngredient(ing: Ingredient) {
    return { type: ShoppingAction.UPDATE_INGREDIENT, payload: ing };
  }

  static removeIngredient(name: string) {
    return { type: ShoppingAction.REMOVE_INGREDIENT, payload: name };
  }
}
