import { StatoPersona } from '../../../shared/enums/users.enum';

export interface DTO_Wizard {
  step: number;
  titolo: string;
}

export interface FormWizard {
  nome: string;
  email: string;
  squadra: string;
  stato: StatoPersona;
  regione: string;
  provincia: string;
}

export interface FormError {
  team: boolean;
  stato: boolean;
  regione: boolean;
  provincia: boolean;
  citta: boolean;
}
