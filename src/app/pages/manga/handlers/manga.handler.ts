import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import {
  ListaManga,
  MangaAperto,
  MangaUtente,
} from '../interfaces/manga.interface';
import { MangaService } from '../services/manga.service';
import { caricaMangaEPreferiti } from './functions/manga.function';

@Injectable({ providedIn: 'root' })
export class MangaHandler {
  public mangaService = inject(MangaService);

  public listaManga: ListaManga[] = [];
  public mangaUtente: MangaUtente = {} as MangaUtente;
  public mangaScaricati: boolean = false;
  public mangaAperti: MangaAperto[] = [];
  public initialMangaUtente: MangaUtente = {} as MangaUtente;

  constructor() {
    this.loadMangaFromStorage();
  }

  inizializzaLista(params: {
    idUtente: string | null;
    caricaMangaUtente: (manga_utente: MangaUtente) => void;
    caricaListaManga: (lista_manga: ListaManga[]) => void;
    caricamentoFallito: Function;
  }): void {
    this.mangaService
      .getListaManga(params.idUtente)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.mangaScaricati = true;
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

  postOrUpdateMangaUtente(mangaUtente: MangaUtente, idUtente: string): void {
    this.mangaService
      .postOrUpdateMangaUtente(
        idUtente,
        mangaUtente.preferiti,
        mangaUtente.letti,
        mangaUtente.completati
      )
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.initialMangaUtente = mangaUtente;
          this.mangaUtente = mangaUtente;
        },
        error: (err) => console.error('Errore modifica utenti', err),
      });
  }

  private loadMangaFromStorage(): void {
    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      this.listaManga = JSON.parse(listaManga);
    }

    const mangaUtente = localStorage.getItem('mangaUtente');
    if (mangaUtente) {
      this.mangaUtente = JSON.parse(mangaUtente);
      this.initialMangaUtente = JSON.parse(mangaUtente);
    }

    const mangaCaricati = sessionStorage.getItem('mangaCaricati');
    if (mangaCaricati) {
      this.mangaScaricati = JSON.parse(mangaCaricati);
    }

    const mangaAperti = sessionStorage.getItem('mangaAperti');
    if (mangaAperti) {
      this.mangaAperti = JSON.parse(mangaAperti);
    }
  }
}
