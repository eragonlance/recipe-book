import { Utility } from './../../shared/utilities';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './../recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { CustomValidators } from './../../shared/custom-validators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { enterLeave } from '../../shared/animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.styl'],
  animations: [enterLeave]
})
export class RecipeEditComponent implements OnInit {
  recipeIdIsValid: boolean;
  isInEditMode: boolean;
  isSubmitted = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private matDialog: MatDialog,
    public themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.isInEditMode = !!id;
    this.recipeIdIsValid = !!this.recipeService.getRecipe(+id);

    if (this.recipeIdIsValid || !this.isInEditMode) {
      this.initForm();
    }
  }

  initForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      ingredients: new FormArray([])
    });

    if (this.isInEditMode) {
      const recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);

      this.recipeForm.reset({
        name: recipe.name,
        imagePath: recipe.imagePath,
        description: recipe.description
      });

      recipe.ingredients.forEach((ing: Ingredient) => {
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

    if (this.isInEditMode) {
      this.recipeService.updateRecipe(+this.route.snapshot.params['id'], this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.isSubmitted = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.recipeIdIsValid && this.isInEditMode) return true;

    if (!this.isSubmitted && this.recipeForm.dirty) {
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
    return Utility.testURL(this.imagePath.value);
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
