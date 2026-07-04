import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dynamicValidator(conditionFn: () => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!conditionFn()) {
      return { invalidValue: { value: control.value } };
    }

    return null;
  };
}
