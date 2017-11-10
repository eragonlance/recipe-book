import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class Utility {
  private static charPool = 'abcefghijklmnopqrstuvwxyz0123456789';
  private static urlRegex = new RegExp(
    '^' +
      '(?:(?:https?|ftp)://)' +
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
      '\\.?' +
      ')' +
      '(?::\\d{2,5})?' +
      '(?:[/?#]\\S*)?' +
      '$',
    'i'
  );
  static headerTitle = new Subject<string>();
  static primaryColor = '#673ab7';
  static accentColor = '#ffd740';

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

  static testURL(url: string): boolean {
    return this.urlRegex.test(url);
  }
}
