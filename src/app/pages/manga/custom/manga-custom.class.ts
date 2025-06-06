import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MangaService } from '../services/manga.service';
import {
  ListaEUtenti,
  ListaManga,
  MangaUtente,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../interfaces/manga.interface';

export abstract class MangaCustom {
  protected router = inject(Router);
  protected mangaService = inject(MangaService);

  protected selezionaOpera(manga: ListaManga) {
    this.mangaService.mangaSelected = {
      nome: manga.nome,
      completato: manga.completato,
    };
    this.router.navigate(['manga/', manga.path], {
      state: { message: this.constructor.name },
    });
  }

  protected inizializzaLista(params: {
    idUtente: string | null;
    caricaManga: (listaEUtenti: ListaEUtenti) => void;
    caricamentoFallito: Function;
  }): void {
    this.mangaService
      .getListaManga(params.idUtente)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.mangaService.mangaScaricati = true;
          params.caricaManga(data);
        },
        error: () => {
          console.error('Lista manga non trovata');
          params.caricamentoFallito();
        },
      });
  }

  protected caricaMangaEPreferiti(params: {
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

  protected createSezioneMangaUtente(
    mangaUtente: MangaUtente
  ): SezioniMangaUtente {
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
      const mangaFind: ListaManga | undefined =
        this.mangaService.listaManga.find((x) => x.id == idManga[i]);
      if (mangaFind) {
        allManga.push(mangaFind);
      }
    }

    return allManga;
  }

  protected voidSplitManga(): SplitMangaUtente {
    return {
      preferiti: [],
      letti: [],
      completati: [],
    };
  }
}
