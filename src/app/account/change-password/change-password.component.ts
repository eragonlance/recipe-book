import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CustomValidators } from '../../shared/custom-validators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.styl']
})
export class ChangePasswordComponent implements OnInit {
  f: FormGroup;
  stateSubject = new Subject<number>();
  state = 0;
  minPasswordLength = 6;
  message = '';

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.f = new FormGroup({
      currentPassword: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)]),
      newPassword: new FormControl(null, [CustomValidators.minChars(this.minPasswordLength)])
    });

    this.stateSubject.subscribe((state: number) => {
      this.state = state;
      if (state === 0) {
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('400px');
      }
      if (state === 1) {
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('250px');
      }
      if (state === 2) {
        this.dialogRef.disableClose = false;
        this.dialogRef.updateSize('250px');
      }
    });
  }

  onSubmit() {
    if (this.f.invalid) return;

    this.message = 'Changing password...';
    this.stateSubject.next(1);

    this.authService
      .reAuthenticate(this.currentPassword.value)
      .then(() => this.authService.changePassword(this.newPassword.value))
      .then(() => this.dialogRef.close(true))
      .catch(err => {
        this.message = err.code === 'auth/wrong-password' ? 'Wrong current password.' : err.message;
        this.stateSubject.next(2);
      });
  }

  onReturn() {
    this.stateSubject.next(0);
  }

  get currentPassword() {
    return this.f.controls.currentPassword;
  }
  get newPassword() {
    return this.f.controls.newPassword;
  }
}
