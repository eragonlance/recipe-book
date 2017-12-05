import { RecipesResolver } from './recipes.resolver';
import { RecipeEditDeactivate } from './recipe-edit/recipe-edit.deactivate';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { DialogComponent } from '../dialog/dialog.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule
} from '@angular/material';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: { recipes: RecipesResolver },
    children: [
      { path: '', component: RecipeListComponent, data: { state: 'recipes' } },
      {
        path: 'new',
        component: RecipeEditComponent,
        canDeactivate: [RecipeEditDeactivate],
        data: { state: 'recipe-new' }
      },
      { path: ':id', component: RecipeDetailComponent, data: { state: 'recipe-detail' } },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canDeactivate: [RecipeEditDeactivate],
        data: { state: 'recipe-edit' }
      }
    ]
  }
];

@NgModule({
  declarations: [RecipesComponent, RecipeListComponent, RecipeDetailComponent, RecipeEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes),
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [RecipeEditDeactivate, RecipesResolver]
})
export class RecipesModule {}
