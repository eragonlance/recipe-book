import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { DialogComponent } from './dialog/dialog.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from './services/data.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingService } from './shopping.service';
import { AuthService } from './services/auth.service';
import { ThemeSwitcherService } from './services/theme-switcher.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';

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
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [RecipeService, ShoppingService, DataService, AuthService, ThemeSwitcherService],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent, DialogComponent, ChangePasswordComponent]
})
export class AppModule {}
