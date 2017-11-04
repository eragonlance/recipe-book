import { CustomValidators } from './../../shared/custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utility } from './../../shared/utilities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {
  f: FormGroup;

  constructor() {}

  ngOnInit() {
    Utility.headerTitle.next('Sign in');

    this.f = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [CustomValidators.minChars(8)])
    });
  }

  submit(e) {
    console.log(this.f, e);
  }

  get email() {
    return this.f.get('email');
  }
  get password() {
    return this.f.get('password');
  }
}
