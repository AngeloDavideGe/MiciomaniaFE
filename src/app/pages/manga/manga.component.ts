import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { compareObjectCustom } from '../../shared/functions/utilities.function';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { generiManga } from './constants/genere.constant';
import { MangaCustom } from './custom/manga-custom.class';
import { getTabsManga } from './functions/manga.functions';
import { manga_imports } from './imports/manga.imports';
import { FiltriManga, TabsManga } from './interfaces/filtri.interface';
import { ListaManga, MangaUtente } from './interfaces/manga.interface';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
})
export class MangaComponent extends MangaCustom implements OnInit, OnDestroy {
  public isManga = signal<boolean>(false);
  private filteredMangaSubject = new BehaviorSubject<ListaManga[]>([]);
  public filterSelect: FiltriManga = {} as FiltriManga;
  public mangaPreferiti: boolean[] = [];
  public tabBoolean: boolean | null = null;
  public erroreHttp: boolean = false;
  public aggiornamentoManga: boolean = false;
  private destroy$ = new Subject<void>();
  public mangaGeneri = generiManga;
  public idUtente: string | null = null;
  public tabs: TabsManga[] = getTabsManga(
    [null, false, true].map((condition) => this.getTabClickHandler(condition))
  );

  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  get filteredManga$() {
    return this.filteredMangaSubject.asObservable();
  }

  set filteredManga(mangaList: ListaManga[]) {
    this.filteredMangaSubject.next(mangaList);
  }

  ngOnInit(): void {
    if (this.router.url == '/manga') {
      this.isManga.set(true);
      this.loadFilteredManga();
    }
    this.routerEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  private routerEvents(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        distinctUntilChanged((prev, curr) => prev.url === curr.url)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/manga') {
          this.isManga.set(true);
          this.loadFilteredManga();
        } else {
          this.isManga.set(false);
        }
      });
  }

  private loadFilteredManga(): void {
    const ms = this.mangaService;
    if (ms.listaManga.length > 0 && ms.mangaScaricati) {
      this.filteredManga = structuredClone(ms.listaManga);
      const savedMangaUtente = JSON.parse(
        localStorage.getItem('mangaUtente') || '{}'
      );
      this.identificaPreferiti(
        savedMangaUtente ? savedMangaUtente : ({} as MangaUtente)
      );
      this.idUtente = this.authService.getUser?.id || null;
    } else {
      ms.listaManga.length > 0 ? null : this.loadingService.show();
      this.aggiornamentoManga = true;
      this.sottoscrizioneUtente();
    }
  }

  private sottoscrizioneUtente(): void {
    const user = this.authService.getUser;
    this.idUtente = user ? user.id : null;
    this.inizializzaLista({
      idUtente: this.idUtente,
      caricaManga: (data) => {
        this.caricaMangaEPreferiti({
          data: data,
          caricaMangaUtente: (mangaUtente) => {
            this.identificaPreferiti(mangaUtente);
            this.mangaService.initialMangaUtente = mangaUtente;
          },
          caricaListaManga: (listamanga) => {
            this.caricaManga(listamanga);
          },
        });
      },
      caricamentoFallito: () => this.caricamentoFallito(),
    });
  }

  private caricaManga(lista: ListaManga[]): void {
    this.loadingService.show();
    this.filteredManga = structuredClone(lista);
    this.mangaService.listaManga = lista;
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

    this.filteredManga = structuredClone(
      this.mangaService.listaManga.filter((manga) => {
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
      this.mangaService.initialMangaUtente
    );

    if (this.idUtente && condEquals) {
      $event ? $event.preventDefault() : null;
      this.upsertMangaUtente(mangaUtente);
    }
  }

  private upsertMangaUtente(mangaUtente: MangaUtente): void {
    this.mangaService
      .postOrUpdateMangaUtente(
        this.idUtente || '',
        mangaUtente.preferiti,
        mangaUtente.letti,
        mangaUtente.completati
      )
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.mangaService.initialMangaUtente = mangaUtente;
          localStorage.setItem('mangaUtente', JSON.stringify(mangaUtente));
        },
        error: (err) => {
          console.error('Errore modifica utenti', err);
        },
      });
  }
}
