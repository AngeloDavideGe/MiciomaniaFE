import { Ruolo } from '../../../../../../shared/enums/users.enum';

export interface CambioRuoloUtente {
  id: string;
  nuovoRuolo: Ruolo;
  vecchioRuolo: Ruolo;
}
