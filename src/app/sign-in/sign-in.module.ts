import { SignInComponent } from './sign-in/sign-in.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

const signInRoutes: Routes = [{ path: '', component: SignInComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(signInRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule {}
