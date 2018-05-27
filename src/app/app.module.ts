import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { DialogComponent } from './dialog/dialog.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppMaterialModule } from './shared/app-material.module';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { ThemeSwitcherService } from './services/theme-switcher.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { recipesReducer } from './ngrx/reducers/recipes.reducer';
import { RecipesEffect } from './ngrx/effects/recipes.effect';
import { shoppingReducer } from './ngrx/reducers/shopping.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
    SignInComponent,
    DialogComponent,
    ChangePasswordComponent
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
