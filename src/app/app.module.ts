import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';

import { BackendService } from './shared/backend.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingService } from './shopping.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorComponent, HomeComponent, FooterComponent, DialogComponent],
  imports: [BrowserModule, MaterialModule, HttpModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [RecipeService, ShoppingService, BackendService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
