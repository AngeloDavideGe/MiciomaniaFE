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
  idUtente: string;
  caricaMangaUtente: (manga_utente: MangaUtente) => void;
  caricaListaManga: (lista_manga: ListaManga[]) => void;
  caricamentoFallito: Function;
}): void {
  const condLista: boolean = params.mangaService.listaManga().length == 0;
  const condMangaUtente: boolean = !DataHttp.mangaUtente && !!params.idUtente;

  if (condLista && condMangaUtente) {
    getAllMangaEPreferiti(
      params.idUtente,
      params.mangaService,
      params.caricaMangaUtente,
      params.caricaListaManga
    );

    console.log('caricamento lista manga e preferiti');
  } else if (!condLista && condMangaUtente) {
    const data: ListaEUtenti = {
      listaManga: params.mangaService.listaManga(),
      mangaUtente: {} as MangaUtente,
    };

    getMangaPreferiti(
      params.idUtente,
      params.mangaService,
      data,
      params.caricaMangaUtente,
      params.caricaListaManga
    );

    console.log('caricamento preferiti manga');
  } else if (condLista && !condMangaUtente) {
    const data: ListaEUtenti = {
      listaManga: params.mangaService.listaManga(),
      mangaUtente: DataHttp.mangaUtente || ({} as MangaUtente),
    };

    getAllManga(
      params.mangaService,
      data,
      params.caricaMangaUtente,
      params.caricaListaManga
    );

    console.log('caricamento lista manga');
  } else {
    const data: ListaEUtenti = {
      listaManga: params.mangaService.listaManga(),
      mangaUtente: DataHttp.mangaUtente || ({} as MangaUtente),
    };

    caricaMangaEPreferiti({
      data: data,
      caricaMangaUtente: () => {
        params.caricaMangaUtente(data.mangaUtente);
      },
      caricaListaManga: () => {
        params.caricaListaManga(data.listaManga);
      },
    });

    console.log('caricamento da segnale');
  }
}

export function postOrUpdateMangaUtente(params: {
  mangaService: MangaService;
  mangaUtente: MangaUtente;
  idUtente: string;
}): void {
  params.mangaService
    .postOrUpdateMangaUtente(params.idUtente, params.mangaUtente)
    .pipe(take(1))
    .subscribe({
      next: () => {
        DataHttp.initialMangaUtente = params.mangaUtente;
        DataHttp.mangaUtente = params.mangaUtente;
      },
      error: (err) => console.error('Errore modifica utenti', err),
    });
}

function getAllMangaEPreferiti(
  idUtente: string,
  mangaService: MangaService,
  caricaMangaUtente: (manga_utente: MangaUtente) => void,
  caricaListaManga: (lista_manga: ListaManga[]) => void
): void {
  mangaService
    .getAllMangaEPreferiti(idUtente)
    .pipe(take(1))
    .subscribe({
      next: (data: ListaEUtenti) => {
        caricaMangaEPreferiti({
          data: data,
          caricaMangaUtente: () => {
            caricaMangaUtente(data.mangaUtente);
          },
          caricaListaManga: () => {
            caricaListaManga(data.listaManga);
          },
        });
      },
    });
}

function getAllManga(
  mangaService: MangaService,
  data: ListaEUtenti,
  caricaMangaUtente: (manga_utente: MangaUtente) => void,
  caricaListaManga: (lista_manga: ListaManga[]) => void
): void {
  mangaService
    .getAllManga()
    .pipe(take(1))
    .subscribe({
      next: (listaManga: ListaManga[]) => {
        data.listaManga = listaManga;
        caricaMangaEPreferiti({
          data: data,
          caricaMangaUtente: () => {
            caricaMangaUtente(data.mangaUtente);
          },
          caricaListaManga: () => {
            caricaListaManga(data.listaManga);
          },
        });
      },
    });
}

function getMangaPreferiti(
  idUtente: string,
  mangaService: MangaService,
  data: ListaEUtenti,
  caricaMangaUtente: (manga_utente: MangaUtente) => void,
  caricaListaManga: (lista_manga: ListaManga[]) => void
): void {
  mangaService
    .getMangaPreferiti(idUtente)
    .pipe(take(1))
    .subscribe({
      next: (mangaUtente: MangaUtente) => {
        caricaMangaEPreferiti({
          data: data,
          caricaMangaUtente: () => {
            caricaMangaUtente(mangaUtente);
          },
          caricaListaManga: () => {
            caricaListaManga(data.listaManga);
          },
        });
      },
    });
}
