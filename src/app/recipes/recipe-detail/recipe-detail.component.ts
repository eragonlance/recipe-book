import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { DialogComponent } from '../../dialog/dialog.component';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { RecipesState } from '../../ngrx/reducers/recipes.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.styl']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  maxId: number;
  private recipeSub: Subscription;

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.recipeSub = this.route.params
      .switchMap(params =>
        this.store.select('recipesReducer').map((recipesState: RecipesState) => {
          this.id = +params['id'];
          this.maxId = recipesState.recipes.length - 1;
          return recipesState.recipes[this.id];
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onDeleteRcipe() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Delete',
        content: 'Do you want to delete ' + this.recipe.name + ' recipe?'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.recipeService.removeRecipe(this.recipe);
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
