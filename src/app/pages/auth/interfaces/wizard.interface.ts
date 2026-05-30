import { StatoPersona } from '../../../shared/enums/users.enum';

export interface FormWizard {
  nome: string;
  email: string;
  squadra: string;
  stato: StatoPersona;
  regione: string;
  provincia: string;
}
