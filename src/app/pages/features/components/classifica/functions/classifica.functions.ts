import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { RecordColonne } from '../../../../../../library/interfaces/table.interface';
import {
  Giocatore,
  Squadra,
} from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';

export function getClassificaTabs(lang: ILang['Classifica']['Tabs']): iTab[] {
  return [
    {
      id: 'giocatori',
      label: lang.Giocatori,
      color: 'var(--primary-light)',
    },
    {
      id: 'squadre',
      label: lang.Squadre,
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

export function getColonneTabellaGiocatori(
  lang: ILang['Classifica']['Colonne'],
): Partial<
  RecordColonne<Giocatore>
> {
  return {
    posizione: {
      titolo: lang.Posizione,
      sortCol: false,
    },
    idUtente: {
      titolo: lang.Nome,
      sortCol: true,
    },
    squadra: {
      titolo: lang.Squadra,
      sortCol: true,
    },
    punteggio: {
      titolo: lang.Punti,
      sortCol: true,
    },
  };
}

export function getColonneTabellaSquadre(
  lang: ILang['Classifica']['Colonne'],
): Partial<RecordColonne<Squadra>> {
  return {
    posizione: {
      titolo: lang.Posizione,
      sortCol: false,
    },
    nome: {
      titolo: lang.Nome,
      sortCol: true,
    },
    punteggio: {
      titolo: lang.Punti,
      sortCol: true,
    },
  };
}
