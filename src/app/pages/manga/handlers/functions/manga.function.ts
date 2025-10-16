import {
  MangaUtente,
  ListaManga,
} from '../../../../shared/interfaces/http.interface';
import { ListaEUtenti } from '../../interfaces/manga.interface';

export function caricaMangaEPreferiti(params: {
  data: ListaEUtenti;
  caricaMangaUtente: (mangaUtente: MangaUtente) => void;
  caricaListaManga: (listaManga: ListaManga[]) => void;
}): void {
  if (params.data.mangaUtente) {
    params.caricaMangaUtente(params.data.mangaUtente);
  }
  params.caricaListaManga(params.data.listaManga);
}
