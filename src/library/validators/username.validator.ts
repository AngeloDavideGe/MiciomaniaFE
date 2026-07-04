import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[a-z0-9]+$/.test(control.value);

    if (!valid) {
      return { invalidUsername: { value: control.value } };
    }

    return null;
  };
}
