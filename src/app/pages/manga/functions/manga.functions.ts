import { MangaUtente } from '../../../shared/interfaces/http.interface';
import {
  ListaManga,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../interfaces/manga.interface';

export function voidSplitManga(): SplitMangaUtente {
  return {
    preferiti: [],
    letti: [],
    completati: [],
  } as SplitMangaUtente;
}

export function createSezioneMangaUtente(
  mu: MangaUtente,
  lm: ListaManga[]
): SezioniMangaUtente {
  const mangaMap = new Map(lm.map((manga) => [manga.id, manga]));

  const convert: Function = (ids: string) =>
    ids
      .split(',')
      .map((id: string) => mangaMap.get(Number(id)))
      .filter(Boolean) as ListaManga[];

  return {
    preferiti: convert(mu.preferiti),
    letti: convert(mu.letti),
    completati: convert(mu.completati),
  };
}
