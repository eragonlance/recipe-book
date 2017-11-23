import { Subscription } from 'rxjs/Subscription';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ThemeSwitcherService } from '../../shared/theme-switcher.service';
import { enterLeave } from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.styl'],
  animations: [enterLeave]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSub: Subscription;

  constructor(
    public recipeService: RecipeService,
    public themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesRefChanged.subscribe(
      () => (this.recipes = this.recipeService.getRecipes())
    );
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }
}
