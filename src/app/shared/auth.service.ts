import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  constructor() {}

  createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }

  getIdToken(): Promise<string> {
    return this.auth.currentUser
      ? this.auth.currentUser.getIdToken()
      : new Promise<string>((resolve, reject) => resolve(''));
  }

  onAuthStateChanged(nextOrObserver: (a: firebase.User) => void): firebase.Unsubscribe {
    return this.auth.onAuthStateChanged(nextOrObserver);
  }

  private get auth() {
    return firebase.auth();
  }
}
