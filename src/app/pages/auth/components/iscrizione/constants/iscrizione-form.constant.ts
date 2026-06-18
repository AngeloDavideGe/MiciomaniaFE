import { Validators } from '@angular/forms';
import { RecordStrutturaMultiForm } from '../../../../../../library/interfaces/form.interface';
import { Ruolo, StatoPersona } from '../../../../../shared/enums/users.enum';
import { User } from '../../../../../shared/interfaces/users.interface';

export function getStrutturaForm(
  user: User,
  squadre: string[],
): RecordStrutturaMultiForm {
  return {
    credenziali: {
      nome: 'Credenziali',
      struttura: {
        nome: {
          titolo: 'Nome',
          tipo: 'Text',
          valueInit: user.credenziali.nome,
          validators: [Validators.required],
          errorMessage: 'Il nome è obbligatorio',
        },
        email: {
          titolo: 'Email',
          tipo: 'Text',
          valueInit: user.credenziali.email,
          validators: [Validators.required, Validators.email],
          errorMessage: 'Inserisci una email valida',
        },
        password: {
          titolo: 'Password',
          tipo: 'Password',
          valueInit: user.credenziali.password,
          validators: [Validators.required, Validators.minLength(6)],
          errorMessage: 'La password deve contenere almeno 6 caratteri',
        },
        ruolo: {
          titolo: 'Ruolo',
          tipo: 'Text',
          readonly: true,
          valueInit: user.credenziali.ruolo || Ruolo.user,
          validators: [],
        },
      },
    },
    profile: {
      nome: 'Profilo',
      struttura: {
        bio: {
          titolo: 'Biografia',
          tipo: 'Textarea',
          valueInit: user.profile.bio || '',
          validators: [],
        },
        telefono: {
          titolo: 'Telefono',
          tipo: 'Text',
          valueInit: user.profile.telefono || '',
          validators: [],
        },
        compleanno: {
          titolo: 'Compleanno',
          tipo: 'Date',
          valueInit: user.profile.compleanno
            ? new Date(user.profile.compleanno).toISOString().split('T')[0]
            : '',
          validators: [],
        },
      },
    },
    iscrizione: {
      nome: 'Iscrizione',
      struttura: {
        stato: {
          titolo: 'Stato',
          tipo: 'Select',
          valueInit: user.iscrizione.stato || '',
          validators: [],
          optionsSelect: Object.values(StatoPersona),
        },
        squadra: {
          titolo: 'Squadra',
          tipo: 'Select',
          valueInit: user.iscrizione.squadra || '',
          validators: [Validators.required],
          optionsSelect: squadre,
          errorMessage: 'Seleziona una squadra',
        },
        provincia: {
          titolo: 'Provincia',
          tipo: 'Text',
          valueInit: user.iscrizione.provincia || '',
          validators: [],
        },
        punteggio: {
          titolo: 'Punteggio',
          tipo: 'Text',
          readonly: true,
          valueInit:
            user.iscrizione.punteggio !== null
              ? String(user.iscrizione.punteggio)
              : '',
          validators: [],
        },
      },
    },
    social: {
      nome: 'Social',
      tipo: 'array',
      initialArray: user.profile.social
        ? Object.entries(user.profile.social).map(([titolo, url]) => ({
            titolo,
            url,
          }))
        : [],
      struttura: {
        titolo: {
          titolo: 'Nome social',
          tipo: 'Text',
          validators: [Validators.required],
          errorMessage: 'Inserisci il nome del social',
        },
        url: {
          titolo: 'URL',
          tipo: 'Text',
          validators: [Validators.required],
          errorMessage: 'Inserisci un URL valido',
        },
      },
    },
  };
}
