import { Validators } from '@angular/forms';
import { RecordStruttura } from '../../../../library/interfaces/form.interface';

export function getLoginForm(): RecordStruttura {
  return {
    email: {
      titolo: 'Email',
      validators: [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ],
      tipo: 'Text',
      errorMessage: 'Email obbligatorio con max 40 caratteri',
    },
    password: {
      titolo: 'Password',
      validators: [Validators.required, Validators.maxLength(20)],
      tipo: 'Password',
      errorMessage: 'Nick obbligatorio con max 20 caratteri',
    },
  };
}

export function getRegisterForm(): RecordStruttura {
  return {
    id: {
      titolo: 'Nickname',
      validators: [Validators.required, Validators.maxLength(15)],
      tipo: 'Text',
      errorMessage: 'Nick obbligatorio con max 15 caratteri',
    },
    nome: {
      titolo: 'Nome e Cognome',
      validators: [Validators.required, Validators.maxLength(30)],
      tipo: 'Text',
      errorMessage: 'Campo obbligatorio con max 30 caratteri',
    },
    email: {
      titolo: 'Email',
      validators: [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ],
      tipo: 'Text',
      errorMessage: 'Email obbligatorio con max 40 caratteri',
    },
    password: {
      titolo: 'Password',
      validators: [Validators.required, Validators.maxLength(20)],
      tipo: 'Password',
      errorMessage: 'Nick obbligatorio con max 20 caratteri',
    },
  };
}
