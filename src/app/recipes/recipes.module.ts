import { RecipesResolver } from './../shared/resolvers';
import { DialogModule } from './../dialog/dialog.module';

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
  MatListModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: { recipes: RecipesResolver },
    children: [
      {
        path: 'new',
        component: RecipeEditComponent,
        canDeactivate: [RecipeEditDeactivate]
      },
      { path: ':id', component: RecipeDetailComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canDeactivate: [RecipeEditDeactivate]
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
    MatListModule,
    MatInputModule,
    MatCardModule,
    DialogModule
  ],
  providers: [RecipeEditDeactivate, RecipesResolver],
  entryComponents: [DialogComponent]
})
export class RecipesModule {}
