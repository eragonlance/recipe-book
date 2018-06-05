import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe } from 'app/models';
import { RecipesState } from 'app/ngrx';
import { ThemeSwitcherService } from 'app/services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.styl']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private themeSwitcherService: ThemeSwitcherService, private store: Store<any>) {}

  ngOnInit() {
    this.recipes$ = this.store
      .select('recipesReducer')
      .map((recipesState: RecipesState) => recipesState.recipes);
  }

  onMouseEnterGridItem(e: MouseEvent) {
    const gridItemTitle = <HTMLElement>(<HTMLElement>e.target).nextElementSibling;
    gridItemTitle.style.backgroundColor = this.themeSwitcherService.getPrimaryColor();
  }

  onMouseLeaveGridItem(e: MouseEvent) {
    const gridItemTitle = <HTMLElement>(<HTMLElement>e.target).nextElementSibling;
    gridItemTitle.style.backgroundColor = 'rgba(0,0,0,.38)';
  }
}
