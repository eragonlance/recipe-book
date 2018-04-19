import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Unsubscribe } from '@firebase/util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
      : this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => this.auth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }

  reAuthenticate(password: string): Promise<any> {
    return this.currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password));
  }

  changePassword(newPassword): Promise<any> {
    return this.currentUser.updatePassword(newPassword);
  }

  getIdToken(): Promise<string> {
    return this.currentUser ? this.currentUser.getIdToken() : Promise.resolve('');
  }

  getEmail(): string {
    return this.currentUser.email;
  }

  onAuthStateChanged(nextOrObserver: (a: User) => void): Unsubscribe {
    return this.auth.onAuthStateChanged(nextOrObserver);
  }

  private get auth(): firebase.auth.Auth {
    return firebase.auth();
  }
  private get currentUser(): User {
    return firebase.auth().currentUser;
  }
}
