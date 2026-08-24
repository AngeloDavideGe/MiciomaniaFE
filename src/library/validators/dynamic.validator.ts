import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dynamicValidator(
  conditionFn: (control: AbstractControl) => boolean,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!conditionFn(control)) {
      return { invalidValue: { value: control.value } };
    }

    return null;
  };
}
