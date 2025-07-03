import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {
  ListaManga,
  MangaUtente,
  MangaVolume,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../interfaces/manga.interface';
import { MangaService } from '../services/manga.service';
import { MangaUtilities } from './utilities/manga.utilities';

@Injectable({ providedIn: 'root' })
export class MangaHandler {
  private mangaUtilities = new MangaUtilities();

  public listaManga: ListaManga[] = [];
  public mangaScaricati: boolean = false;
  public initialMangaUtente: MangaUtente = {} as MangaUtente;
  public mangaAperti: { nome: string; volumi: MangaVolume[] }[] = [];
  public mangaSelected: { nome: string; completato: boolean } | null = null;

  public voidSplitManga: Function = (): SplitMangaUtente => {
    return this.mangaUtilities.voidSplitManga();
  };

  public router = inject(Router);
  public mangaService = inject(MangaService);

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
          this.mangaUtilities.caricaMangaEPreferiti({
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

  resettaMangaUtente(): void {
    this.listaManga = [] as ListaManga[];
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

  createSezioneMangaUtente(mu: MangaUtente): SezioniMangaUtente {
    const mangaPerStorage: SplitMangaUtente = {
      preferiti: mu.preferiti.split(',').map(Number),
      letti: mu.letti.split(',').map(Number),
      completati: mu.completati.split(',').map(Number),
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
}
