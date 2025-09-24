import { finalize, Observable, take } from 'rxjs';
import {
  ListaManga,
  MangaUtente,
} from '../../../shared/interfaces/http.interface';
import {
  MangaENome,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../interfaces/manga.interface';

export function loadMangaVolumiENome(params: {
  pathOpera: string;
  loadingFunction: () => void;
  loadVolumiFunc: (pathOpera: string) => Observable<MangaENome>;
  finalizeFunction: () => void;
  nextCallback: (data: MangaENome) => void;
}) {
  params.loadingFunction();

  params
    .loadVolumiFunc(params.pathOpera)
    .pipe(
      take(1),
      finalize(() => params.finalizeFunction())
    )
    .subscribe({
      next: (data: MangaENome) => params.nextCallback(data),
      error: () => console.error('Si è verificato un errore'),
    });
}

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
