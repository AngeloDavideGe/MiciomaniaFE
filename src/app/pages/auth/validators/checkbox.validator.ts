import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || [];
    if (Array.isArray(value) && value.length === 0) {
      return { arrayEmpty: true };
    }
    return null;
  };
}
