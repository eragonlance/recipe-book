import { CustomValidators } from './../../shared/CustomValidators';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingService } from './../../shopping.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.styl']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  selectedIng: Ingredient;
  selectedIngSub: Subscription;
  addIngForm: FormGroup;

  get name() {
    return this.addIngForm.get('name');
  }
  get amount() {
    return this.addIngForm.get('amount');
  }

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.addIngForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, CustomValidators.positiveNumber])
    });

    this.selectedIngSub = this.shoppingService.selectedIng.subscribe((ing: Ingredient) => {
      this.selectedIng = ing;
      if (ing) {
        this.addIngForm.reset({
          name: ing.name,
          amount: ing.amount
        });
        this.name.disable();
      } else {
        this.name.enable();
      }
    });
  }

  onSubmit() {
    if (this.selectedIng) {
      this.shoppingService.updateIng(this.name.value, this.amount.value);
    } else {
      this.shoppingService.addIng(new Ingredient(this.name.value, +this.amount.value));
    }
    this.addIngForm.reset();
  }

  onClickDeleteIngredient() {
    this.shoppingService.removeIng(this.selectedIng);
    this.addIngForm.reset();
  }

  onClickRemoveAll() {
    this.shoppingService.removeAll();
  }

  onClickAddRandom(n: number) {
    this.shoppingService.addRandom(n);
  }

  ngOnDestroy() {
    this.selectedIngSub.unsubscribe();
  }
}
