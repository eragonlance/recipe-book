import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { ChangePasswordComponent, DialogComponent, SignInComponent } from 'app/components/dialogs';
import { Recipe } from 'app/models';
import { AuthService, DataService } from 'app/services/';
import { Utils } from 'app/shared/utils';
import { RecipesAction, RecipesState } from 'app/ngrx';
import { Subscription } from 'rxjs/Subscription';

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
    private dataService: DataService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.headerTitleSub = Utils.headerTitle.subscribe(
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
            const recipes$ = this.store
              .select('recipesReducer')
              .map((state: RecipesState) => state.recipes)
              .take(1);
            recipes$.subscribe((recipes: Recipe[]) => {
              this.dataService.saveRecipes(token, recipes).subscribe(
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
            });
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
        if (res) this.store.dispatch(RecipesAction.fetchRecipes());
      });
  }

  get userEmail() {
    return this.authService.getEmail();
  }

  ngOnDestroy() {
    this.headerTitleSub.unsubscribe();
  }
}
