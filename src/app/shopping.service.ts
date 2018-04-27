import { Utils } from './shared/utils';
import { Ingredient } from './shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingService {
  ingredients: Map<string, Ingredient> = new Map([
    ['Chicken thighs', new Ingredient('Chicken thighs', 5)],
    ['Apples', new Ingredient('Apples', 10)]
  ]);

  listChanged = new Subject<void>();
  selectedIng = new Subject<Ingredient>();

  getIngs(): Ingredient[] {
    return Array.from(this.ingredients.values());
  }

  addIng(...ings: Ingredient[]) {
    ings.forEach(ing => {
      if (this.ingredients.has(ing.name)) {
        this.ingredients.get(ing.name).amount += ing.amount;
      } else {
        this.ingredients.set(ing.name, new Ingredient(ing.name, ing.amount));
      }
    });

    this.listChanged.next();
  }

  updateIng(name: string, amount: number): boolean {
    if (!this.ingredients.has(name)) {
      return false;
    }

    this.ingredients.get(name).amount = amount;
    return true;
  }

  removeIng(ing: Ingredient) {
    if (!ing) {
      return;
    }

    this.ingredients.delete(ing.name);
    this.selectedIng.next(null);
    this.listChanged.next();
  }

  removeAll() {
    this.ingredients.clear();
    this.selectedIng.next(null);
    this.listChanged.next();
  }

  addRandom(n: number) {
    for (let i = 0; i < n; i++) {
      const name = Utils.strRand(10);
      this.ingredients.set(name, new Ingredient(name, Utils.numRand(1, 100)));
    }
    this.listChanged.next();
  }
}
