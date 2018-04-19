import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../shared/custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {
  f: FormGroup;
  state: 'init' | 'pending' | 'error';
  minPasswordLength = 6;
  message = '';

  constructor(private dialogRef: MatDialogRef<SignInComponent>, private authService: AuthService) {}

  ngOnInit() {
    this.f = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)]),
      remember: new FormControl(false)
    });

    this.setState('init');
  }

  signIn() {
    if (this.f.invalid) {
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
    if (this.f.invalid) {
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
    return this.f.get('email');
  }
  get password() {
    return this.f.get('password');
  }
  get remember() {
    return this.f.get('remember');
  }
}
