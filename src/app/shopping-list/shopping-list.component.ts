import { ThemeSwitcherService } from '../services/theme-switcher.service';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '../shared/utils';
import { Ingredient } from '../models/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { enterLeave } from '../shared/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ShoppingState, shoppingReducer } from '../ngrx/reducers/shopping.reducer';
import { ShoppingAction } from '../ngrx/actions/shopping.action';

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
