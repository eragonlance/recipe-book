import { Subscription } from 'rxjs/Subscription';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ThemeSwitcherService } from '../../shared/theme-switcher.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.styl']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesRefChanged.subscribe(
      () => (this.recipes = this.recipeService.getRecipes())
    );
  }

  onMouseEnterGridItem(e: MouseEvent) {
    const gridItemTitle = <HTMLElement>(<HTMLElement>e.target).nextElementSibling;
    gridItemTitle.style.backgroundColor = this.themeSwitcherService.getPrimaryColor();
  }

  onMouseLeaveGridItem(e: MouseEvent) {
    const gridItemTitle = <HTMLElement>(<HTMLElement>e.target).nextElementSibling;
    gridItemTitle.style.backgroundColor = 'rgba(0,0,0,.38)';
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }
}
