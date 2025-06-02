import { Ruolo } from '../../../../../auth/enums/users.enum';

export interface CambioRuoloUtente {
  id: string;
  nuovoRuolo: Ruolo;
  vecchioRuolo: Ruolo;
}
