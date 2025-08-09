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
  const mangaPerStorage: SplitMangaUtente = {
    preferiti: mu.preferiti.split(',').map(Number),
    letti: mu.letti.split(',').map(Number),
    completati: mu.completati.split(',').map(Number),
  };

  const sezionePerStorage: SezioniMangaUtente = {
    preferiti: convertedIdtoManga(mangaPerStorage.preferiti, lm),
    letti: convertedIdtoManga(mangaPerStorage.letti, lm),
    completati: convertedIdtoManga(mangaPerStorage.completati, lm),
  };

  return sezionePerStorage;
}

function convertedIdtoManga(
  idManga: number[],
  listaManga: ListaManga[]
): ListaManga[] {
  let allManga: ListaManga[] = [];

  for (let i = 0; i < idManga.length; i++) {
    const mangaFind: ListaManga | undefined = listaManga.find(
      (x) => x.id == idManga[i]
    );
    if (mangaFind) {
      allManga.push(mangaFind);
    }
  }

  return allManga;
}
