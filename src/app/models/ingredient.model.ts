export class Ingredient {
  constructor(public name: string, public amount: number) {}

  static clone(ing: Ingredient) {
    return { ...ing };
  }
}
