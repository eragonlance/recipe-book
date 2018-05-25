import { Utils } from '../../shared/utils';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Ingredient } from '../../models/ingredient.model';
import { CustomValidators } from './../../shared/custom-validators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { enterLeave } from '../../shared/animations';
import { Store } from '@ngrx/store';
import { RecipesAction } from '../../ngrx/actions/recipes.action';
import { Recipe } from '../../models/recipe.model';
import { RecipesState } from '../../ngrx/reducers/recipes.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.styl'],
  animations: [enterLeave]
})
export class RecipeEditComponent implements OnInit {
  isSubmitted = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private store: Store<any>,
    public themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    if (id) {
      this.store
        .select('recipesReducer')
        .map((recipesState: RecipesState) =>
          recipesState.recipes.find((recipe: Recipe) => recipe.id === id)
        )
        .take(1)
        .subscribe((recipe: Recipe) => (this.recipe = recipe));
    } else {
      this.recipe = new Recipe(null, '', '', '', []);
    }

    this.initForm();
  }

  initForm() {
    if (!this.recipe) {
      return;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      ingredients: new FormArray([])
    });

    this.recipeForm.reset({
      name: this.recipe.name,
      imagePath: this.recipe.imagePath,
      description: this.recipe.description
    });

    if (this.recipe.ingredients.length > 0) {
      this.recipe.ingredients.forEach((ing: Ingredient) => {
        this.ingredients.push(
          new FormGroup({
            name: new FormControl(ing.name, Validators.required),
            amount: new FormControl(ing.amount, [
              Validators.required,
              CustomValidators.positiveNumber
            ])
          })
        );
      });
    } else {
      this.ingredients.push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, [Validators.required, CustomValidators.positiveNumber])
        })
      );
    }
  }

  onAddIng() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, CustomValidators.positiveNumber])
      })
    );
  }

  onRemoveIng(index: number) {
    if (this.ingredients.value[index].name || this.ingredients.value[index].name) {
      this.ingredients.markAsDirty();
    }
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return;
    }

    (this.recipeForm.value as Recipe).ingredients.forEach(ing => (ing.amount = +ing.amount));

    if (this.recipe.id) {
      this.store.dispatch(
        RecipesAction.editRecipe({ id: this.recipe.id, ...this.recipeForm.value })
      );
    } else {
      this.store.dispatch(
        RecipesAction.addRecipe({ id: Utils.numRandDigit(10), ...this.recipeForm.value })
      );
    }

    this.isSubmitted = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.recipe || this.isSubmitted) return true;

    if (this.recipeForm.dirty) {
      const dialogRef = this.matDialog.open(DialogComponent, {
        width: '250px',
        data: {
          title: 'Cancel',
          content: 'Discard all changes and leave?'
        }
      });
      return dialogRef.afterClosed().map(res => (res ? true : false));
    }

    return true;
  }

  testImageURL(): boolean {
    return Utils.testURL(this.imagePath.value);
  }

  get name() {
    return this.recipeForm.get('name');
  }
  get imagePath() {
    return this.recipeForm.get('imagePath');
  }
  get description() {
    return this.recipeForm.get('description');
  }
  get ingredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }
}
