import { ThemeSwitcherService } from './../shared/theme-switcher.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingService } from './../shopping.service';
import { Utility } from './../shared/utilities';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.styl']
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
    Utility.headerTitle.next('Shopping list');
    this.ingredients = this.shoppingService.getIngs();

    this.listChangedSub = this.shoppingService.listChanged.subscribe(() => {
      this.ingredients = this.shoppingService.getIngs();
    });
  }

  select(ing: Ingredient) {
    this.selectedIng = this.selectedIng === ing ? null : ing;
    this.shoppingService.selectedIng.next(this.selectedIng);
  }

  ngOnDestroy() {
    this.listChangedSub.unsubscribe();
  }
}
