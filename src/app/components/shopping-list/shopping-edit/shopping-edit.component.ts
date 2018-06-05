import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Store } from '@ngrx/store';

import { Ingredient } from 'app/models';
import { ShoppingAction } from 'app/ngrx';
import { CustomValidators } from 'app/shared/custom-validators';
import { Utils } from 'app/shared/utils';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.styl']
})
export class ShoppingEditComponent implements OnInit, OnChanges {
  @Input() selectedIng: Ingredient;

  addIngForm: FormGroup;
  errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return control.touched && control.invalid ? true : false;
    }
  };

  get name() {
    return this.addIngForm.get('name');
  }
  get amount() {
    return this.addIngForm.get('amount');
  }

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.addIngForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, CustomValidators.positiveNumber])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedIng'].isFirstChange()) return;

    if (this.selectedIng) {
      this.addIngForm.reset({
        name: this.selectedIng.name,
        amount: this.selectedIng.amount
      });
      this.name.disable();
    } else {
      this.name.enable();
      this.addIngForm.reset();
    }
  }

  onSubmit() {
    if (this.addIngForm.invalid) {
      this.name.markAsTouched();
      this.amount.markAsTouched();
      return;
    }

    if (this.selectedIng) {
      this.store.dispatch(
        ShoppingAction.updateIngredient(new Ingredient(this.name.value, this.amount.value))
      );
    } else {
      this.store.dispatch(
        ShoppingAction.addIngredient(new Ingredient(this.name.value, this.amount.value))
      );
      this.addIngForm.reset();
    }
  }

  onClickRemoveAll() {
    this.store.dispatch(ShoppingAction.removeAll());
  }

  onClickAddRandom(n: number) {
    const ings: Ingredient[] = [];
    for (let i = 0; i < n; i++) {
      const name = Utils.strRand(10);
      ings.push(new Ingredient(name, Utils.numRand(1, 100)));
    }
    this.store.dispatch(ShoppingAction.addIngredient(...ings));
  }
}
