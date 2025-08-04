import { take } from 'rxjs';
import { DataHttp } from '../../../core/api/http.data';
import { MangaService } from '../services/manga.service';
import { caricaMangaEPreferiti } from './functions/manga.function';
import {
  MangaUtente,
  ListaManga,
} from '../../../shared/interfaces/http.interface';
import { ListaEUtenti } from '../interfaces/manga.interface';

export function inizializzaLista(params: {
  mangaService: MangaService;
  idUtente: string | null;
  caricaMangaUtente: (manga_utente: MangaUtente) => void;
  caricaListaManga: (lista_manga: ListaManga[]) => void;
  caricamentoFallito: Function;
}): void {
  params.mangaService
    .getListaManga(params.idUtente)
    .pipe(take(1))
    .subscribe({
      next: (data: ListaEUtenti) => {
        DataHttp.mangaScaricati = true;
        caricaMangaEPreferiti({
          data: data,
          caricaMangaUtente: () => {
            params.caricaMangaUtente(data.manga_utente[0]);
          },
          caricaListaManga: () => {
            params.caricaListaManga(data.lista_manga);
          },
        });
      },
      error: () => {
        console.error('Lista manga non trovata');
        params.caricamentoFallito();
      },
    });
}

export function postOrUpdateMangaUtente(params: {
  mangaService: MangaService;
  mangaUtente: MangaUtente;
  idUtente: string;
}): void {
  params.mangaService
    .postOrUpdateMangaUtente(
      params.idUtente,
      params.mangaUtente.preferiti,
      params.mangaUtente.letti,
      params.mangaUtente.completati
    )
    .pipe(take(1))
    .subscribe({
      next: () => {
        DataHttp.initialMangaUtente = params.mangaUtente;
        DataHttp.mangaUtente = params.mangaUtente;
      },
      error: (err) => console.error('Errore modifica utenti', err),
    });
}
