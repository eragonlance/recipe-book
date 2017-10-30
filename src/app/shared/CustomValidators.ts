import { FormControl } from '@angular/forms';

export class CustomValidators {
  static positiveNumber(control: FormControl) {
    if (+control.value < 1) {
      return { positiveNumber: true };
    }
    return null;
  }

  static url(control: FormControl) {
    const re = new RegExp(/https?:\/\/(www\.)[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, 'gi');
    if (control.value && re.test(control.value)) {
      console.log('is an url');
      return null;
    }
    return { url: true };
  }
}
