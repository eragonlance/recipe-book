import { AuthService } from './../shared/auth.service';
import { BackendService } from '../shared/backend.service';
import { Utility } from './../shared/utilities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RecipeService } from '../recipes/recipe.service';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTitle = '';
  headerTitleSub: Subscription;
  isSignedIn = false;

  constructor(
    private backendService: BackendService,
    private recipeService: RecipeService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.headerTitleSub = Utility.headerTitle.subscribe(
      (headerTitle: string) => (this.headerTitle = headerTitle)
    );

    this.authService.onAuthStateChanged(user => {
      if (user) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    });
  }

  onSignIn() {
    this.matDialog.open(SignInComponent, {
      width: '600px'
    });
  }

  onSignOut() {
    this.authService.signOut();
  }

  onSaveData() {
    this.authService.getIdToken().then((token: string) => {
      if (!token) {
        this.matDialog.open(DialogComponent, {
          width: '400px',
          data: {
            title: 'Not authorized',
            content: 'Only signed in users are allowed to save to database.',
            dialType: 'notice'
          }
        });
      } else {
        this.backendService.saveRecipes(token);
      }
    });
  }

  onFetchData() {
    this.backendService.fetchRecipes().subscribe(recipes => this.recipeService.setRecipes(recipes));
  }

  ngOnDestroy() {
    this.headerTitleSub.unsubscribe();
  }
}
