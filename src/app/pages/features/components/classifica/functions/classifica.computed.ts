import { GetOrderCustom } from '../../../../../../library/functions/ordinamento.function';
import { creaBarPaths } from '../../../../../../library/functions/svg.function';
import { PathSvgCustom } from '../../../../../../library/interfaces/svg.interface';
import {
  Classifica,
  Giocatore,
  Squadra,
} from '../../../../../shared/interfaces/opere.interface';
import { opzioniGraficoClassifica } from './classifica.functions';

export function computedTabellaClassifica(
  key: keyof Classifica,
  classifica: Classifica | null,
): (Giocatore | Squadra)[] {
  if (!classifica) {
    return [];
  }

  const items: (Giocatore | Squadra)[] = classifica[key];

  if (items.length === 0) {
    return [];
  }

  return GetOrderCustom<Giocatore | Squadra>(items, 'punteggio', false).map(
    (item: Giocatore | Squadra, index: number) => ({
      ...item,
      posizione: index + 1,
    }),
  );
}

export function computedPathsClassifica(
  key: keyof Classifica,
  classifica: Classifica | null,
  func?: Function,
): PathSvgCustom[] {
  if (!classifica) {
    return [];
  }

  const items: (Giocatore | Squadra)[] = GetOrderCustom<Giocatore | Squadra>(
    classifica[key],
    'punteggio',
    false,
  );

  if (items.length === 0) {
    return [];
  }

  switch (key) {
    case 'giocatori': {
      return creaBarPaths(
        items.map((item: Giocatore | Squadra) => ({
          titolo: (item as Giocatore).idUtente + ' - ' + item.punteggio,
          valore: item.punteggio,
          colore: 'var(--primary-light)',
        })),
        opzioniGraficoClassifica(),
      );
    }
    case 'squadre': {
      return creaBarPaths(
        items.map((item: Giocatore | Squadra) => ({
          titolo: (item as Squadra).nome + ' - ' + item.punteggio,
          valore: item.punteggio,
          colore: (item as Squadra).colore || 'var(--primary-light)',
          click: () => func?.(item),
        })),
        opzioniGraficoClassifica(),
      );
    }
    default: {
      return [];
    }
  }
}
