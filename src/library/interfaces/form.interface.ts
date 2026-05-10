import { FormControl, ValidatorFn } from '@angular/forms';
import { ICheckBox } from './checkbox.interface';

export type RecordStruttura = Record<string, StrutturaForm>;

export type FormInterface = Record<string, FormControl<string | null>>;

export type BuildInterface = Record<string, (string | ValidatorFn[])[]>;

export interface StrutturaForm {
  titolo: string;
  validators: ValidatorFn[];
  tipo: 'Select' | 'Text' | 'Textarea' | 'Password' | 'Checkbox' | 'Date';
  valueInit?: string;
  errorMessage?: string;
  optionsSelect?: string[];
  checkbox?: ICheckBox[];
  onChange?: (x: string) => void;
}
