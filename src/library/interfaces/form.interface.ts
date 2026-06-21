import { FormControl, ValidatorFn } from '@angular/forms';

export type RecordStrutturaMultiForm = Record<string, StrutturaMultiForm>;

export interface StrutturaMultiForm {
  nome: string;
  struttura: RecordStruttura;
  tipo?: 'group' | 'array';
  initialArray?: Record<string, any>[];
}

export type RecordStruttura = Record<string, StrutturaForm>;
export type FormInterface = Record<string, FormControl<string | null>>;
export type BuildInterface = Record<string, (string | ValidatorFn[])[]>;

export interface StrutturaForm {
  titolo: string;
  validators: ValidatorFn[];
  tipo: tipoForm;
  valueInit?: string;
  errorMessage?: string;
  readonly?: boolean;
  optionsSelect?: string[];
  checkbox?: ICheckBox[];
  file?: TipoFileForm;
  onChange?: (x: any) => void;
}

export type tipoForm =
  | 'Select'
  | 'Text'
  | 'Textarea'
  | 'Password'
  | 'Checkbox'
  | 'Date'
  | 'File';

export interface TipoFileForm {
  previewUrl?: string | ArrayBuffer | null;
  allowedExtensions: string[];
  allowedTypes: string[];
  accept: string;
}

export interface ICheckBox {
  testo: string;
  id: string;
  icon?: string;
  azioneCheck?: () => void;
  azioneNoCheck?: () => void;
}
