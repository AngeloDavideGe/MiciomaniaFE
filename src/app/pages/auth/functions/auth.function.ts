import { AbstractControl, Validators } from '@angular/forms';
import {
  RecordStruttura,
  RecordStrutturaMultiForm,
  StrutturaForm,
} from '../../../../library/interfaces/form.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { regioni } from '../../../../library/constants/utility.constant';
import { dynamicValidator } from '../../../../library/validators/dynamic.validator';

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

export function getEditUserForm(user: User | null): RecordStrutturaMultiForm {
  const social = user?.profile.social || {};
  const date = user?.profile.compleanno
    ? new Date(user.profile.compleanno).toISOString().slice(0, 10)
    : '';

  const provinciaField: StrutturaForm = {
    titolo: 'Provincia',
    validators: [Validators.required],
    tipo: 'Select',
    valueInit: '',
    optionsSelect: [],
  };

  return {
    account: {
      nome: 'Account',
      struttura: {
        id: {
          titolo: 'ID utente',
          validators: [],
          tipo: 'Text',
          valueInit: user?.id || '',
          readonly: true,
        },
        nome: {
          titolo: 'Nome',
          validators: [Validators.required, Validators.maxLength(30)],
          tipo: 'Text',
          valueInit: user?.credenziali.nome || '',
          errorMessage:
            'Il nome è obbligatorio e può avere massimo 30 caratteri',
        },
        email: {
          titolo: 'Email',
          validators: [
            Validators.required,
            Validators.maxLength(40),
            Validators.email,
          ],
          tipo: 'Text',
          valueInit: user?.credenziali.email || '',
          errorMessage: 'Inserisci un indirizzo email valido',
        },
        password: {
          titolo: 'Password',
          validators: [Validators.required, Validators.maxLength(20)],
          tipo: 'Password',
          valueInit: user?.credenziali.password || '',
          errorMessage:
            'La password è obbligatoria e può avere massimo 20 caratteri',
          onChange: (_value: string, form) => {
            form.get('confirmPassword')?.updateValueAndValidity();
          },
        },
        confirmPassword: {
          titolo: 'Conferma password',
          validators: [
            Validators.required,
            dynamicValidator(
              (control: AbstractControl) =>
                control.value === control.parent?.get('password')?.value,
            ),
          ],
          tipo: 'Password',
          valueInit: '',
          errorMessage: 'Le password devono coincidere',
        },
      },
    },
    profile: {
      nome: 'Profilo',
      struttura: {
        compleanno: {
          titolo: 'Compleanno',
          validators: [],
          tipo: 'Date',
          valueInit: date,
        },
        bio: {
          titolo: 'Biografia',
          validators: [],
          tipo: 'Textarea',
          valueInit: user?.profile.bio || '',
          readonly: true,
        },
      },
    },
    social: {
      nome: 'Social',
      tipo: 'array',
      struttura: {
        piattaforma: {
          titolo: 'Piattaforma',
          validators: [Validators.required, Validators.maxLength(30)],
          tipo: 'Text',
          errorMessage: 'Indica la piattaforma social',
        },
        link: {
          titolo: 'Link o username',
          validators: [Validators.required, Validators.maxLength(100)],
          tipo: 'Text',
          errorMessage: 'Inserisci il link o lo username',
        },
      },
      initialArray: Object.entries(social).map(([piattaforma, link]) => ({
        piattaforma,
        link,
      })),
    },
    iscrizione: {
      nome: 'Iscrizione',
      struttura: {
        squadra: {
          titolo: 'Squadra',
          validators: [Validators.maxLength(50)],
          tipo: 'Text',
          valueInit: user?.iscrizione.squadra || '',
        },
        regione: {
          titolo: 'Regione',
          validators: [Validators.required],
          tipo: 'Select',
          valueInit: '',
          optionsSelect: regioni.map((regione) => regione.label),
          onChange: (value: string, form) => {
            form.get('provincia')?.reset('');

            provinciaField.optionsSelect =
              regioni.find((regione) => regione.label === value)?.province ||
              [];
          },
        },
        provincia: provinciaField,
        punteggio: {
          titolo: 'Punteggio',
          validators: [],
          tipo: 'Text',
          valueInit: user?.iscrizione.punteggio?.toString() || '',
          readonly: true,
        },
      },
    },
  };
}
