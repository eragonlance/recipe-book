import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';

import { BackendService } from './shared/backend.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingService } from './shopping.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorComponent, HomeComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    AppRoutingModule
  ],
  providers: [RecipeService, ShoppingService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {}
