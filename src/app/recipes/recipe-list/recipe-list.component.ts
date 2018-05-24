import { Recipe } from '../../models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { Observable } from 'rxjs/Observable';
import { RecipesState } from '../../ngrx/reducers/recipes.reducer';
import { Store } from '@ngrx/store';

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
