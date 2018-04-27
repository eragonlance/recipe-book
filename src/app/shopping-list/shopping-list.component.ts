import { ThemeSwitcherService } from '../services/theme-switcher.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingService } from './../shopping.service';
import { Utils } from '../shared/utils';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { enterLeave } from '../shared/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.styl'],
  animations: [enterLeave]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  selectedIng: Ingredient;
  filterString = '';
  private listChangedSub: Subscription;

  constructor(
    public shoppingService: ShoppingService,
    public themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    Utils.headerTitle.next('Shopping list');
    this.ingredients = this.shoppingService.getIngs();

    this.listChangedSub = this.shoppingService.listChanged.subscribe(() => {
      this.ingredients = this.shoppingService.getIngs();
    });
  }

  onSelect(ing: Ingredient) {
    this.selectedIng = this.selectedIng === ing ? null : ing;
    this.shoppingService.selectedIng.next(this.selectedIng);
  }

  onDelete(ing: Ingredient) {
    this.shoppingService.removeIng(this.selectedIng);
  }

  ngOnDestroy() {
    this.listChangedSub.unsubscribe();
  }
}
