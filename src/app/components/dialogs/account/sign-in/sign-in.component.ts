import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from 'app/services/auth.service';
import { CustomValidators } from 'app/shared/custom-validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  state: 'init' | 'pending' | 'error';
  minPasswordLength = 6;
  message = '';

  constructor(private dialogRef: MatDialogRef<SignInComponent>, private authService: AuthService) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)]),
      remember: new FormControl(false)
    });

    this.setState('init');
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }

    this.setState('pending');
    this.message = 'Logging in...';

    this.authService
      .signInWithEmailAndPassword(this.email.value, this.password.value, this.remember.value)
      .then(() => this.dialogRef.close())
      .catch(err => {
        this.setState('error');
        this.setErrorMessage(err);
      });
  }

  signUp() {
    if (this.signInForm.invalid) {
      return;
    }

    this.setState('pending');
    this.message = 'Signing up...';

    this.authService
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        this.message = 'Sign up succeeded. Automatically logging in...';
        return this.authService.signInWithEmailAndPassword(this.email.value, this.password.value);
      })
      .then(() => this.dialogRef.close())
      .catch(err => {
        this.setState('error');
        this.setErrorMessage(err);
      });
  }

  onReturn() {
    this.setState('init');
  }

  private setErrorMessage(error: { code: string; message: string }) {
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

  private setState(state: 'init' | 'pending' | 'error') {
    this.state = state;

    switch (state) {
      case 'init':
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('500px');
        break;
      case 'pending':
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('250px');
        break;
      case 'error':
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('350px');
        break;
    }
  }

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  get remember() {
    return this.signInForm.get('remember');
  }
}
