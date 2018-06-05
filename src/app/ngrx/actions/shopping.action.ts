import { Ingredient } from 'app/models';

export class ShoppingAction {
  static ADD_INGREDIENT = 'ADD_INGREDIENT';
  static UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
  static REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
  static REMOVE_ALL = 'REMOVE_ALL';

  static addIngredient(...ings: Ingredient[]) {
    return { type: ShoppingAction.ADD_INGREDIENT, payload: ings.map(ing => Ingredient.clone(ing)) };
  }

  static updateIngredient(ing: Ingredient) {
    return { type: ShoppingAction.UPDATE_INGREDIENT, payload: Ingredient.clone(ing) };
  }

  static removeIngredient(name: string) {
    return { type: ShoppingAction.REMOVE_INGREDIENT, payload: name };
  }

  static removeAll() {
    return { type: ShoppingAction.REMOVE_ALL, payload: null };
  }
}
