import { ChangePasswordComponent } from './../account/change-password/change-password.component';
import { AuthService } from './../shared/auth.service';
import { BackendService } from '../shared/backend.service';
import { Utility } from './../shared/utilities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RecipeService } from '../recipes/recipe.service';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../account/sign-in/sign-in.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTitle = '';
  headerTitleSub: Subscription;
  isSignedIn: boolean;

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
      width: '500px'
    });
  }

  onSignOut() {
    this.matDialog
      .open(DialogComponent, {
        width: '250px',
        data: {
          title: 'Sign out',
          content: 'Do you want to sign out?',
          type: 'confirm'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) this.authService.signOut();
      });
  }

  onChangePassword() {
    const dialogRef = this.matDialog.open(ChangePasswordComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.matDialog.open(DialogComponent, {
          width: '300px',
          data: {
            title: 'Success',
            content: 'Password is successfully changed.',
            type: 'alert'
          }
        });
      }
    });
  }

  onSaveRecipes() {
    this.matDialog
      .open(DialogComponent, {
        width: '350px',
        data: {
          title: 'Save recipes',
          content: 'Do you want to save the current recipe list to database?',
          type: 'confirm'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (!res) return;

        this.authService.getIdToken().then((token: string) => {
          if (!token) {
            this.matDialog.open(DialogComponent, {
              width: '400px',
              data: {
                title: 'Unauthorized',
                content: 'Only signed in users are allowed to save to database.',
                type: 'alert'
              }
            });
          } else {
            this.backendService.saveRecipes(token, this.recipeService.getRecipes()).subscribe(
              () => {
                this.matDialog.open(DialogComponent, {
                  width: '300px',
                  data: {
                    title: 'Success',
                    content: 'Successfully saved to database.',
                    type: 'alert'
                  }
                });
              },
              err => console.log(err)
            );
          }
        });
      });
  }

  onFetchRecipes() {
    this.matDialog
      .open(DialogComponent, {
        width: '350px',
        data: {
          title: 'Fetch recipes',
          content:
            'Your current recipe list will be completely replaced by the one fetched from database. Proceed?',
          type: 'confirm',
          danger: true
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res)
          this.backendService
            .fetchRecipes(true)
            .subscribe(recipes => this.recipeService.setRecipes(recipes));
      });
  }

  ngOnDestroy() {
    this.headerTitleSub.unsubscribe();
  }
}
