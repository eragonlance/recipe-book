import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Utility } from './shared/utilities';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB9tJVEnEwyjTpRSOPwJZMYATQ6Klzp-cc',
      authDomain: 'recipe-book-eragonlance.firebaseapp.com'
    });
  }
}
