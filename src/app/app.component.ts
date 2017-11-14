import { Recipe } from './recipes/recipe.model';
import { BackendService } from './shared/backend.service';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  constructor(private backendService: BackendService, private recipeService: RecipeService) {}

  ngOnInit() {}
}
