import { AbstractControl, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const valid = /^[a-z0-9]+$/.test(value);
    return valid ? null : { invalidUsername: { value: control.value } };
  };
}
