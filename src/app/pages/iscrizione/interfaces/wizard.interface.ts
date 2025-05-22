import { StatoPersona } from '../../auth/enums/users.enum';

export interface DTO_Wizard {
  step: number;
  titolo: string;
}

export interface FormWizard {
  nome: string;
  email: string;
  team: string;
  stato: StatoPersona;
  regione: string;
  provincia: string;
  citta: string;
}

export interface FormError {
  team: boolean;
  stato: boolean;
  regione: boolean;
  provincia: boolean;
  citta: boolean;
}
