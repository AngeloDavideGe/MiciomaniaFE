import { FormControl } from '@angular/forms';
import { StatoPersona } from '../../../shared/enums/users.enum';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SigninForm {
  nome: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface Step2Form {
  squadra: FormControl<string | null>;
  stato: FormControl<StatoPersona | null>;
  regione: FormControl<string | null>;
  provincia: FormControl<string | null>;
}
