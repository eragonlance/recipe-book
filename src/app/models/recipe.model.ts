import { Ingredient } from './ingredient.model';

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}

  static clone(recipe: Recipe): Recipe {
    return {
      ...recipe,
      ingredients: recipe.ingredients.map((ing: Ingredient) => (ing = Ingredient.clone(ing)))
    };
  }
}
