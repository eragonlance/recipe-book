import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from 'app/services';
import { CustomValidators } from 'app/shared/custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.styl']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  state: 'init' | 'pending' | 'error';
  minPasswordLength = 6;
  message = '';

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)]),
      newPassword: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)])
    });

    this.setState('init');
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;

    this.message = 'Changing password...';
    this.setState('pending');

    this.authService
      .reAuthenticate(this.currentPassword.value)
      .then(() => this.authService.changePassword(this.newPassword.value))
      .then(() => this.dialogRef.close(true))
      .catch(err => {
        this.message = err.code === 'auth/wrong-password' ? 'Wrong current password.' : err.message;
        this.setState('error');
      });
  }

  onReturn() {
    this.setState('init');
    this.passwordForm.reset();
  }

  private setState(state: 'init' | 'pending' | 'error') {
    this.state = state;

    switch (state) {
      case 'init':
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('400px');
        break;
      case 'pending':
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('250px');
        break;
      case 'error':
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('250px');
        break;
    }
  }

  get currentPassword() {
    return this.passwordForm.controls.currentPassword;
  }
  get newPassword() {
    return this.passwordForm.controls.newPassword;
  }
}
