import { AbstractControl, Validators } from '@angular/forms';
import {
  RecordStruttura,
  RecordStrutturaMultiForm,
  StrutturaForm,
} from '../../../../library/interfaces/form.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { regioni } from '../../../../library/constants/utility.constant';
import { dynamicValidator } from '../../../../library/validators/dynamic.validator';
import { ILang } from '../../../core/interfaces/lang.interface';

export function getLoginForm(lang: ILang['Login']['Form']): RecordStruttura {
  return {
    email: {
      titolo: lang.Email,
      validators: [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ],
      tipo: 'Text',
      errorMessage: lang.ErroreEmail,
    },
    password: {
      titolo: lang.Password,
      validators: [Validators.required, Validators.maxLength(20)],
      tipo: 'Password',
      errorMessage: lang.ErrorePassword,
    },
  };
}

export function getRegisterForm(
  lang: ILang['Register']['Form'],
): RecordStruttura {
  return {
    id: {
      titolo: lang.Nickname,
      validators: [Validators.required, Validators.maxLength(15)],
      tipo: 'Text',
      errorMessage: lang.ErroreNickname,
    },
    nome: {
      titolo: lang.NomeCompleto,
      validators: [Validators.required, Validators.maxLength(30)],
      tipo: 'Text',
      errorMessage: lang.ErroreNomeCompleto,
    },
    email: {
      titolo: lang.Email,
      validators: [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ],
      tipo: 'Text',
      errorMessage: lang.ErroreEmail,
    },
    password: {
      titolo: lang.Password,
      validators: [Validators.required, Validators.maxLength(20)],
      tipo: 'Password',
      errorMessage: lang.ErrorePassword,
    },
  };
}

export function getEditUserForm(
  user: User | null,
  lang: ILang['Profilo']['EditUser'],
): RecordStrutturaMultiForm {
  const social = user?.profile.social || {};
  const date = user?.profile.compleanno
    ? new Date(user.profile.compleanno).toISOString().slice(0, 10)
    : '';

  const provinciaField: StrutturaForm = {
    titolo: lang.Campi.Provincia,
    validators: [Validators.required],
    tipo: 'Select',
    valueInit: '',
    optionsSelect: [],
  };

  return {
    account: {
      nome: lang.Sezioni.Account,
      struttura: {
        id: {
          titolo: lang.Campi.IdUtente,
          validators: [],
          tipo: 'Text',
          valueInit: user?.id || '',
          readonly: true,
        },
        nome: {
          titolo: lang.Campi.Nome,
          validators: [Validators.required, Validators.maxLength(30)],
          tipo: 'Text',
          valueInit: user?.credenziali.nome || '',
          errorMessage: lang.Errori.Nome,
        },
        email: {
          titolo: lang.Campi.Email,
          validators: [
            Validators.required,
            Validators.maxLength(40),
            Validators.email,
          ],
          tipo: 'Text',
          valueInit: user?.credenziali.email || '',
          errorMessage: lang.Errori.Email,
        },
        password: {
          titolo: lang.Campi.Password,
          validators: [Validators.required, Validators.maxLength(20)],
          tipo: 'Password',
          valueInit: user?.credenziali.password || '',
          errorMessage: lang.Errori.Password,
          onChange: (_value: string, form) => {
            form.get('confirmPassword')?.updateValueAndValidity();
          },
        },
        confirmPassword: {
          titolo: lang.Campi.ConfermaPassword,
          validators: [
            Validators.required,
            dynamicValidator(
              (control: AbstractControl) =>
                control.value === control.parent?.get('password')?.value,
            ),
          ],
          tipo: 'Password',
          valueInit: '',
          errorMessage: lang.Errori.ConfermaPassword,
        },
      },
    },
    profile: {
      nome: lang.Sezioni.Profilo,
      struttura: {
        compleanno: {
          titolo: lang.Campi.Compleanno,
          validators: [],
          tipo: 'Date',
          valueInit: date,
        },
        bio: {
          titolo: lang.Campi.Biografia,
          validators: [],
          tipo: 'Textarea',
          valueInit: user?.profile.bio || '',
          readonly: true,
        },
      },
    },
    social: {
      nome: lang.Sezioni.Social,
      tipo: 'array',
      struttura: {
        piattaforma: {
          titolo: lang.Campi.Piattaforma,
          validators: [Validators.required, Validators.maxLength(30)],
          tipo: 'Text',
          errorMessage: lang.Errori.Piattaforma,
        },
        link: {
          titolo: lang.Campi.LinkUsername,
          validators: [Validators.required, Validators.maxLength(100)],
          tipo: 'Text',
          errorMessage: lang.Errori.LinkUsername,
        },
      },
      initialArray: Object.entries(social).map(([piattaforma, link]) => ({
        piattaforma,
        link,
      })),
    },
    iscrizione: {
      nome: lang.Sezioni.Iscrizione,
      struttura: {
        squadra: {
          titolo: lang.Campi.Squadra,
          validators: [Validators.maxLength(50)],
          tipo: 'Text',
          valueInit: user?.iscrizione.squadra || '',
        },
        regione: {
          titolo: lang.Campi.Regione,
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
          titolo: lang.Campi.Punteggio,
          validators: [],
          tipo: 'Text',
          valueInit: user?.iscrizione.punteggio?.toString() || '',
          readonly: true,
        },
      },
    },
  };
}
