import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, take } from 'rxjs';
import {
  ListaEUtenti,
  ListaManga,
  MangaUtente,
  MangaVolume,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../interfaces/manga.interface';
import { MangaService } from '../services/manga.service';

@Injectable({ providedIn: 'root' })
export class MangaHandler {
  public listaManga: ListaManga[] = [];
  public mangaScaricati: boolean = false;
  public initialMangaUtente: MangaUtente = {} as MangaUtente;
  public mangaAperti: { nome: string; volumi: MangaVolume[] }[] = [];
  public mangaSelected: { nome: string; completato: boolean } | null = null;

  router = inject(Router);
  mangaService = inject(MangaService);

  constructor() {
    this.loadMangaFromStorage();
  }

  selezionaOpera(manga: ListaManga) {
    this.mangaSelected = {
      nome: manga.nome,
      completato: manga.completato,
    };
    this.router.navigate(['manga/', manga.path], {
      state: { message: this.constructor.name },
    });
  }

  inizializzaLista(params: {
    idUtente: string | null;
    caricaManga: (listaEUtenti: ListaEUtenti) => void;
    caricamentoFallito: Function;
  }): void {
    this.mangaService
      .getListaManga(params.idUtente)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.mangaScaricati = true;
          params.caricaManga(data);
        },
        error: () => {
          console.error('Lista manga non trovata');
          params.caricamentoFallito();
        },
      });
  }

  caricaMangaEPreferiti(params: {
    data: ListaEUtenti;
    caricaMangaUtente: (mangaUtente: MangaUtente) => void;
    caricaListaManga: (listaManga: ListaManga[]) => void;
  }): void {
    if (params.data.manga_utente) {
      params.caricaMangaUtente(params.data.manga_utente[0]);
    }
    params.caricaListaManga(params.data.lista_manga);
    localStorage.setItem('listaManga', JSON.stringify(params.data.lista_manga));
    sessionStorage.setItem('mangaCaricati', JSON.stringify(true));
  }

  createSezioneMangaUtente(mangaUtente: MangaUtente): SezioniMangaUtente {
    const mangaPerStorage: SplitMangaUtente = {
      preferiti: mangaUtente.preferiti.split(',').map(Number),
      letti: mangaUtente.letti.split(',').map(Number),
      completati: mangaUtente.completati.split(',').map(Number),
    };

    const sezionePerStorage: SezioniMangaUtente = {
      preferiti: this.convertedIdtoManga(mangaPerStorage.preferiti),
      letti: this.convertedIdtoManga(mangaPerStorage.letti),
      completati: this.convertedIdtoManga(mangaPerStorage.completati),
    };

    return sezionePerStorage;
  }

  private convertedIdtoManga(idManga: number[]): ListaManga[] {
    let allManga: ListaManga[] = [];

    for (let i = 0; i < idManga.length; i++) {
      const mangaFind: ListaManga | undefined = this.listaManga.find(
        (x) => x.id == idManga[i]
      );
      if (mangaFind) {
        allManga.push(mangaFind);
      }
    }

    return allManga;
  }

  voidSplitManga(): SplitMangaUtente {
    return {
      preferiti: [],
      letti: [],
      completati: [],
    };
  }

  resettaMangaUtente(): void {
    this.listaManga = [] as ListaManga[];
  }

  private loadMangaFromStorage(): void {
    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      this.listaManga = JSON.parse(listaManga);
    }

    const mangaUtente = localStorage.getItem('mangaUtente');
    if (mangaUtente) {
      this.initialMangaUtente = JSON.parse(mangaUtente);
    }

    const mangaCaricati = sessionStorage.getItem('mangaCaricati');
    if (mangaCaricati) {
      this.mangaScaricati = JSON.parse(mangaCaricati);
    }
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
          localStorage.setItem('mangaUtente', JSON.stringify(mangaUtente));
        },
        error: (err) => {
          console.error('Errore modifica utenti', err);
        },
      });
  }
}
