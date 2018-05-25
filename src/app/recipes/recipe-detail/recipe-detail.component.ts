import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DialogComponent } from '../../dialog/dialog.component';
import { Recipe } from '../../models/recipe.model';
import { RecipesState } from '../../ngrx/reducers/recipes.reducer';
import { RecipesAction } from '../../ngrx/actions/recipes.action';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingAction } from '../../ngrx/actions/shopping.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.styl']
})
export class RecipeDetailComponent implements OnInit {
  data$: Observable<Data>;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.data$ = this.route.params.switchMap(params =>
      this.store.select('recipesReducer').map((recipesState: RecipesState): Data => {
        const recipes = recipesState.recipes;
        const idx = recipes.findIndex((recipe: Recipe) => recipe.id === +params['id']);
        if (idx === -1) {
          return null;
        }

        return {
          recipe: recipes[idx],
          previousId: recipes[idx - 1] ? recipes[idx - 1].id : -1,
          nextId: recipes[idx + 1] ? recipes[idx + 1].id : -1
        };
      })
    );
  }

  onAddToShoppingList(ings: Ingredient[]) {
    this.store.dispatch(ShoppingAction.addIngredient(...ings));
  }

  onDeleteRcipe(recipe: Recipe) {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Delete',
        content: 'Do you want to delete ' + recipe.name + ' recipe?'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(RecipesAction.removeRecipe(recipe.id));
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}

interface Data {
  recipe: Recipe;
  previousId: number;
  nextId: number;
}
