import { Ingredient } from './../shared/ingredient.model';

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}

  static clone(recipe: Recipe): Recipe {
    return new Recipe(recipe.id, recipe.name, recipe.description, recipe.imagePath, [
      ...recipe.ingredients
    ]);
  }
}
