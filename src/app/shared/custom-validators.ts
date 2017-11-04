import { FormControl } from '@angular/forms';

export class CustomValidators {
  static positiveNumber(control: FormControl) {
    if (+control.value < 1) {
      return { positiveNumber: true };
    }
    return null;
  }

  static minChars(n: number) {
    return function(control: FormControl) {
      if (!control.value || control.value.length < n) {
        return { minChars: true };
      }
      return null;
    };
  }
}
