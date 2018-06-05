import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatListModule, MatInputModule } from '@angular/material';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FilterPipe } from 'app/shared/filter.pipe';

const shoppingListRoutes: Routes = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent, FilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingListRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatInputModule
  ]
})
export class ShoppingListModule {}
