import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { RecordColonne } from '../../../../../../library/interfaces/table.interface';
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

export function getBadgeTable(): Record<number, string> {
  return {
    1: 'bg-success text-light rounded-pill px-2 py-1',
    2: 'bg-secondary text-light rounded-pill px-2 py-1',
    3: 'bg-warning text-dark rounded-pill px-2 py-1',
    4: 'bg-info text-light rounded-pill px-2 py-1',
    5: 'bg-light text-secondary rounded-pill px-2 py-1 border',
  };
}

export function getColonneTabellaGiocatori(): Partial<
  RecordColonne<Giocatore>
> {
  return {
    posizione: {
      titolo: 'Posizione',
      sortCol: false,
    },
    idUtente: {
      titolo: 'Nome',
      sortCol: true,
    },
    squadra: {
      titolo: 'Squadra',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punti',
      sortCol: true,
    },
  };
}

export function getColonneTabellaSquadre(): Partial<RecordColonne<Squadra>> {
  return {
    posizione: {
      titolo: 'Posizione',
      sortCol: false,
    },
    nome: {
      titolo: 'Nome',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punti',
      sortCol: true,
    },
  };
}
