import { FormControl } from '@angular/forms';

export class CustomValidators {
  static positiveNumber(control: FormControl) {
    if (+control.value < 1) {
      return { positiveNumber: true };
    }
    return null;
  }
}
