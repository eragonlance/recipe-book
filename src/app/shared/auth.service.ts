import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB9tJVEnEwyjTpRSOPwJZMYATQ6Klzp-cc',
      authDomain: 'recipe-book-eragonlance.firebaseapp.com'
    });
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string, remember = true): Promise<any> {
    return remember
      ? this.auth.signInWithEmailAndPassword(email, password)
      : this.auth
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => this.auth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }

  getIdToken(): Promise<string> {
    return this.currentUser
      ? this.currentUser.getIdToken()
      : new Promise<string>((resolve, reject) => resolve(''));
  }

  getEmail(): string {
    return this.currentUser.email;
  }

  onAuthStateChanged(nextOrObserver: (a: firebase.User) => void): firebase.Unsubscribe {
    return this.auth.onAuthStateChanged(nextOrObserver);
  }

  private get auth() {
    return firebase.auth();
  }
  private get currentUser() {
    return firebase.auth().currentUser;
  }
}
