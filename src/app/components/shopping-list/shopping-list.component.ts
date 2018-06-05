import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from 'app/models';
import { ThemeSwitcherService } from 'app/services';
import { Utils } from 'app/shared/utils';
import { enterLeave } from 'app/shared/animations';

import { ShoppingAction, shoppingReducer, ShoppingState } from 'app/ngrx';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.styl'],
  animations: [enterLeave]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  selectedIng: Ingredient;
  filterString = '';
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<any>, public themeSwitcherService: ThemeSwitcherService) {}

  ngOnInit() {
    Utils.headerTitle.next('Shopping list');

    this.ingredients$ = this.store
      .select('shoppingReducer')
      .map((state: ShoppingState) => state.ingredients);
  }

  onSelect(ing: Ingredient) {
    this.selectedIng = this.selectedIng === ing ? null : ing;
  }

  onDelete(ing: Ingredient) {
    this.store.dispatch(ShoppingAction.removeIngredient(ing.name));
    this.selectedIng = null;
  }
}
