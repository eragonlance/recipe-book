import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppMaterialModule } from 'app/app-material.module';

import {
  AppComponent,
  ChangePasswordComponent,
  DialogComponent,
  ErrorComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  SignInComponent
} from 'app/components';

import { AuthService, DataService, ThemeSwitcherService } from 'app/services';

import { recipesReducer, RecipesEffect, shoppingReducer } from 'app/ngrx';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    DialogComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ recipesReducer, shoppingReducer }),
    EffectsModule.forRoot([RecipesEffect]),
    AppMaterialModule
  ],
  providers: [DataService, AuthService, ThemeSwitcherService],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent, DialogComponent, ChangePasswordComponent]
})
export class AppModule {}
