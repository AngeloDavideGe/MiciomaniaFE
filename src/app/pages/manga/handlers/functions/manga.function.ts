import {
  ListaEUtenti,
  ListaManga,
  MangaUtente,
  SplitMangaUtente,
} from '../../interfaces/manga.interface';

export function caricaMangaEPreferiti(params: {
  data: ListaEUtenti;
  caricaMangaUtente: (mangaUtente: MangaUtente) => void;
  caricaListaManga: (listaManga: ListaManga[]) => void;
}): void {
  if (params.data.manga_utente) {
    params.caricaMangaUtente(params.data.manga_utente[0]);
  }
  params.caricaListaManga(params.data.lista_manga);
}

export function voidSplitManga(): SplitMangaUtente {
  return {
    preferiti: [],
    letti: [],
    completati: [],
  };
}
