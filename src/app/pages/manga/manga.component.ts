import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, startWith, tap } from 'rxjs';
import { compareObjectCustom } from '../../shared/functions/utilities.function';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { LoadingService } from '../../shared/services/loading.service';
import { generiManga } from './constants/genere.constant';
import { getTabsManga } from './functions/manga.functions';
import { MangaHandler } from './handlers/manga.handler';
import { manga_imports } from './imports/manga.imports';
import { FiltriManga, TabsManga } from './interfaces/filtri.interface';
import { ListaManga, MangaUtente } from './interfaces/manga.interface';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
})
export class MangaComponent implements OnDestroy {
  public filterSelect: FiltriManga = {} as FiltriManga;
  public mangaPreferiti: boolean[] = [];
  public tabBoolean: boolean | null = null;
  public erroreHttp: boolean = false;
  public aggiornamentoManga: boolean = false;
  public mangaGeneri = generiManga;
  public idUtente: string | null = null;
  public filteredManga = signal<ListaManga[]>([]);
  public tabs: TabsManga[] = getTabsManga(
    [null, false, true].map((condition) => this.getTabClickHandler(condition))
  );

  private authHandler = inject(AuthHandler);
  private loadingService = inject(LoadingService);
  public mangaHandler = inject(MangaHandler);

  public isManga$: Observable<boolean> = this.mangaHandler.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.mangaHandler.router.url } as NavigationEnd),
    map((event) => event.url == '/manga'),
    tap(() => this.loadFilteredManga())
  );

  ngOnDestroy(): void {
    this.upsertOnDestroy(null);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    this.upsertOnDestroy($event);
  }

  private getTabClickHandler(condition: boolean | null): Function {
    return () => {
      if (this.tabBoolean !== condition) {
        this.tabBoolean = condition;
        this.logFilterChanges();
      }
    };
  }

  private loadFilteredManga(): void {
    const ms = this.mangaHandler;
    if (ms.listaManga.length > 0 && ms.mangaScaricati) {
      this.filteredManga.set(ms.listaManga);
      const savedMangaUtente = JSON.parse(
        localStorage.getItem('mangaUtente') || '{}'
      );
      this.identificaPreferiti(
        savedMangaUtente ? savedMangaUtente : ({} as MangaUtente)
      );
      this.idUtente = this.authHandler.user()?.id || null;
    } else {
      ms.listaManga.length > 0 ? null : this.loadingService.show();
      this.aggiornamentoManga = true;
      this.sottoscrizioneUtente();
    }
  }

  private sottoscrizioneUtente(): void {
    const user = this.authHandler.user();
    this.idUtente = user ? user.id : null;

    this.mangaHandler.inizializzaLista({
      idUtente: this.idUtente,
      caricaMangaUtente: (manga_utente: MangaUtente) => {
        this.identificaPreferiti(manga_utente);
        this.mangaHandler.initialMangaUtente = manga_utente;
      },
      caricaListaManga: (lista_manga: ListaManga[]) =>
        this.caricaManga(lista_manga),
      caricamentoFallito: () => this.caricamentoFallito(),
    });
  }

  private caricaManga(lista: ListaManga[]): void {
    this.loadingService.show();
    this.filteredManga.set(lista);
    this.mangaHandler.listaManga = lista;
    this.aggiornamentoManga = false;
    this.loadingService.hide();
  }

  private identificaPreferiti(mangaUtente: MangaUtente): void {
    if (mangaUtente?.preferiti) {
      localStorage.setItem('mangaUtente', JSON.stringify(mangaUtente));
      const arrayIdPreferiti: number[] = mangaUtente.preferiti
        .split(',')
        .map(Number);

      arrayIdPreferiti.forEach((valore, indice) => {
        this.mangaPreferiti[valore] = true;
      });
    }
  }

  private caricamentoFallito(): void {
    this.erroreHttp = true;
    this.loadingService.hide();
  }

  onGenreChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filterSelect.genere = target.value;
    this.logFilterChanges();
  }

  logFilterChanges() {
    const filterKeys = Object.keys(this.filterSelect) as (keyof FiltriManga)[];

    this.filteredManga.set(
      this.mangaHandler.listaManga.filter((manga) => {
        for (const key of filterKeys) {
          if (
            this.filterSelect[key] &&
            !this.matchesFilter(manga, key) &&
            this.filterSelect[key] !== 'Qualsiasi'
          ) {
            return false;
          }
        }
        return this.tabBoolean === null || manga.completato == this.tabBoolean;
      })
    );
  }

  private matchesFilter(manga: ListaManga, key: keyof FiltriManga): boolean {
    return manga[key]
      .toLowerCase()
      .includes(this.filterSelect[key].toString().toLowerCase());
  }

  private upsertOnDestroy($event: BeforeUnloadEvent | null): void {
    const mangaUtenteString = localStorage.getItem('mangaUtente') || '{}';
    const mangaUtente: MangaUtente = JSON.parse(mangaUtenteString);

    const condEquals = !compareObjectCustom(
      mangaUtente,
      this.mangaHandler.initialMangaUtente
    );

    if (this.idUtente && condEquals) {
      $event ? $event.preventDefault() : null;
      this.upsertMangaUtente(mangaUtente);
    }
  }

  private upsertMangaUtente(mangaUtente: MangaUtente): void {
    this.mangaHandler.postOrUpdateMangaUtente(mangaUtente, this.idUtente || '');
  }
}
