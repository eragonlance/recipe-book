import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class Utility {
  private static charPool = 'abcefghijklmnopqrstuvwxyz0123456789';
  static headerTitle = new Subject<string>();
  static primaryColor: string;
  static accentColor: string;

  /** Generate a random integer*/
  static numRand(min: number = 0, max: number = 9): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /** Generate a random string */
  static strRand(length: number): string {
    const poolLength = Utility.charPool.length;
    let str = '';
    for (let i = 0; i < length; i++) {
      str += Utility.charPool.charAt(Utility.numRand(0, poolLength - 1));
    }
    return str;
  }
}
