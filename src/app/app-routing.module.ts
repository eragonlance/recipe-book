import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent, ErrorComponent } from 'app/components';

const appRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: HomeComponent, outlet: 'homepage' }]
  },
  {
    path: 'recipes',
    loadChildren: './components/recipes/recipes.module#RecipesModule',
    data: { state: 'recipes' }
  },
  {
    path: 'shopping-list',
    loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule',
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
