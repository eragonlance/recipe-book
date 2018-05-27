import { Subject } from 'rxjs/Subject';

export class Utils {
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

  /** Generate a random positive integer */
  static numRand(min: number, max: number): number {
    if (min < 0 || max < 0 || min > max) {
      return -1;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /** Generate a random positive integer with specified number of digits */
  static numRandDigit(numOfDigits: number): number {
    if (numOfDigits < 1 || numOfDigits >= Number.MAX_SAFE_INTEGER.toString().length) {
      return -1;
    }
    if (numOfDigits === 1) {
      return Utils.numRand(0, 9);
    }
    return Utils.numRand(Math.pow(10, numOfDigits - 1), Math.pow(10, numOfDigits) - 1);
  }

  /** Generate a random string */
  static strRand(length: number): string {
    const poolLength = Utils.charPool.length;
    let str = '';
    for (let i = 0; i < length; i++) {
      str += Utils.charPool.charAt(Utils.numRand(0, poolLength - 1));
    }
    return str;
  }

  /** Test if a string is a URL */
  static testURL(url: string): boolean {
    return this.urlRegex.test(url);
  }

  /** Immutably splice an array and return the new one */
  static spliceReturnNewArray(
    arr: any[],
    start: number,
    deleteCount?: number,
    ...args: any[]
  ): any[] {
    const tmp = [...arr];
    tmp.splice(start, deleteCount, ...args);
    return tmp;
  }
}
