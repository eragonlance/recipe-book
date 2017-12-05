import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: HomeComponent, outlet: 'homepage' }]
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule',
    data: { state: 'recipes' }
  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule',
    data: { state: 'shopping-list' }
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
