import { RecordColonne } from '../../../../../../library/interfaces/table.interface';
import { iTab } from '../../../../../../library/interfaces/tabs.interface';
import {
  Giocatore,
  Squadra,
} from '../../../../../shared/interfaces/opere.interface';

export function getClassificaTabs(): iTab[] {
  return [
    {
      id: 'giocatori',
      label: 'Giocatori',
      color: 'var(--primary-light)',
    },
    {
      id: 'squadre',
      label: 'Squadre',
      color: 'var(--primary-light)',
    },
  ];
}

export function getColonneTabellaGiocatori(): Partial<
  RecordColonne<Giocatore>
> {
  return {
    idUtente: {
      titolo: 'Nome',
      lunghezza: '20rem',
      sortCol: true,
    },
    squadra: {
      titolo: 'Squadra',
      lunghezza: '20rem',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punti',
      lunghezza: '10rem',
      sortCol: true,
    },
  };
}

export function getColonneTabellaSquadre(): Partial<RecordColonne<Squadra>> {
  return {
    nome: {
      titolo: 'Nome',
      lunghezza: '20rem',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punti',
      lunghezza: '10rem',
      sortCol: true,
    },
  };
}
