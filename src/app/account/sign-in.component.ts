import { AuthService } from './../shared/auth.service';
import { CustomValidators } from './../shared/custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit, OnDestroy {
  f: FormGroup;
  stateSubject = new Subject<number>();
  state = 0;
  minPasswordLength = 6;
  message = '';

  constructor(private dialogRef: MatDialogRef<SignInComponent>, private authService: AuthService) {}

  ngOnInit() {
    this.f = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)]),
      remember: new FormControl(false)
    });

    this.stateSubject.subscribe((state: number) => {
      this.state = state;
      if (state === 0) {
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('600px');
      }
      if (state === 1) {
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('350px');
      }
      if (state === 2) {
        this.dialogRef.disableClose = false;
      }
    });
  }

  signIn() {
    if (this.f.invalid) {
      return;
    }

    this.stateSubject.next(1);
    this.message = 'Logging in...';

    this.authService
      .signInWithEmailAndPassword(this.email.value, this.password.value, this.remember.value)
      .then(
        () => {
          this.dialogRef.close();
        },
        err => {
          this.stateSubject.next(2);
          this.setErrorMessage(err);
        }
      );
  }

  signUp() {
    if (this.f.invalid) {
      return;
    }

    this.stateSubject.next(1);
    this.message = 'Signing up...';

    this.authService.createUserWithEmailAndPassword(this.email.value, this.password.value).then(
      () => {
        this.message = 'Sign up succeeded. Automatically logging in...';

        this.authService.signInWithEmailAndPassword(this.email.value, this.password.value).then(
          () => this.dialogRef.close(),
          err => {
            this.stateSubject.next(2);
            this.setErrorMessage(err);
          }
        );
      },
      err => {
        this.stateSubject.next(2);
        this.setErrorMessage(err);
      }
    );
  }

  onReturn() {
    this.stateSubject.next(0);
  }

  setErrorMessage(error: { code: string; message: string }) {
    switch (error.code) {
      case 'auth/wrong-password':
        this.message = 'The password for ' + this.email.value + ' is incorrect.';
        break;
      case 'auth/user-not-found':
        this.message = 'There is no account associated with ' + this.email.value;
        break;
      default:
        this.message = error.message;
    }
  }

  ngOnDestroy() {
    this.stateSubject.unsubscribe();
  }

  get email() {
    return this.f.get('email');
  }
  get password() {
    return this.f.get('password');
  }
  get remember() {
    return this.f.get('remember');
  }
}
