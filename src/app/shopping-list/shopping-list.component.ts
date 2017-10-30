import { Subscription } from 'rxjs/Subscription';
import { ShoppingService } from './../shopping.service';
import { Utility } from './../shared/utilities';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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

  constructor(public shoppingService: ShoppingService, private route: ActivatedRoute) {}

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

@Injectable()
export class ShoppingResolver implements Resolve<Ingredient[]> {
  constructor(private shoppingService: ShoppingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
    return new Promise<Ingredient[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.shoppingService.getIngs());
      }, 0);
    });
  }
}
