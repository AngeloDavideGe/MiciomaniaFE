import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnDestroy,
  Signal,
  signal,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { compareObjectCustom } from '../../shared/functions/utilities.function';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { LoadingService } from '../../shared/services/template/loading.service';
import { generiManga } from './constants/genere.constant';
import { getTabsManga } from './functions/manga.functions';
import { MangaHandler } from './handlers/manga.handler';
import { manga_imports } from './imports/manga.imports';
import { PulsantiManga, TabsManga } from './interfaces/filtri.interface';
import { ListaManga, MangaUtente } from './interfaces/manga.interface';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
})
export class MangaComponent implements OnDestroy {
  public authHandler = inject(AuthHandler);
  public mangaHandler = inject(MangaHandler);
  private loadingService = inject(LoadingService);

  public mangaPreferiti: boolean[] = [];
  public erroreHttp: boolean = false;
  public aggiornamentoManga: boolean = false;
  public mangaGeneri = generiManga;
  public idUtente: string | null = null;
  public pulsanti: PulsantiManga[] = this.getPulsanti();

  private debounce = {
    autore: signal(''),
    nome: signal(''),
    autoreTimeout: {} as any,
    nomeTimeout: {} as any,
  };
  public filterSelect = {
    genere: signal<string>(''),
    autore: signal<string>(''),
    nome: signal<string>(''),
    tabBoolean: signal<boolean | null>(null),
  };

  public filteredManga: Signal<ListaManga[]> = computed(() =>
    this.logFilterChanges()
  );
  public tabs: TabsManga[] = getTabsManga(
    [null, false, true].map((condition) => this.getTabClickHandler(condition))
  );

  public isManga$: Observable<boolean> = this.mangaHandler.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({
      url: this.mangaHandler.router.url,
    }),
    map((event) => event.url == '/manga'),
    tap((isManga) => (isManga ? this.loadFilteredManga() : null))
  );

  constructor() {
    effect(() => {
      const value = this.filterSelect.autore();
      clearTimeout(this.debounce.autoreTimeout);
      this.debounce.autoreTimeout = setTimeout(() => {
        this.debounce.autore.set(value);
      }, 300);
    });

    effect(() => {
      const value = this.filterSelect.nome();
      clearTimeout(this.debounce.nomeTimeout);
      this.debounce.nomeTimeout = setTimeout(() => {
        this.debounce.nome.set(value);
      }, 300);
    });
  }

  ngOnDestroy(): void {
    this.upsertOnDestroy(null);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    this.upsertOnDestroy($event);
  }

  private getPulsanti(): PulsantiManga[] {
    return [
      {
        click: () => this.mangaHandler.router.navigate(['/home']),
        disabled: false,
        titolo: 'Torna alla Home',
        icona: 'bi bi-house-door me-2',
      },
      {
        click: () => this.mangaHandler.router.navigate(['/manga/tuoi-manga']),
        disabled: !this.authHandler.user(),
        titolo: 'I tuoi Manga',
        icona: 'bi bi-book me-2',
      },
      {
        click: () =>
          this.mangaHandler.router.navigate(['/manga/manga-miciomani']),
        disabled: !this.authHandler.user(),
        titolo: 'Manga Miciomani',
        icona: 'bi bi-emoji-sunglasses me-2',
      },
    ];
  }

  private getTabClickHandler(condition: boolean | null): Function {
    return () => {
      if (this.filterSelect.tabBoolean() !== condition) {
        this.filterSelect.tabBoolean.set(condition);
        this.logFilterChanges();
      }
    };
  }

  private logFilterChanges(): ListaManga[] {
    return this.mangaHandler.listaManga.filter((manga) => {
      return (
        (this.filterSelect.genere() === 'Qualsiasi' ||
          manga.genere.includes(this.filterSelect.genere())) &&
        (this.debounce.autore() === '' ||
          manga.autore
            .toLowerCase()
            .includes(this.debounce.autore().toLowerCase())) &&
        (this.debounce.nome() === '' ||
          manga.nome
            .toLowerCase()
            .includes(this.debounce.nome().toLowerCase())) &&
        (this.filterSelect.tabBoolean() === null ||
          (this.filterSelect.tabBoolean() === false && !manga.completato) ||
          (this.filterSelect.tabBoolean() === true && manga.completato))
      );
    });
  }

  private loadFilteredManga(): void {
    const ms = this.mangaHandler;
    if (ms.listaManga.length > 0 && ms.mangaScaricati) {
      this.filterSelect.nome.set('');
      this.identificaPreferiti(this.mangaHandler.mangaUtente);
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
    this.mangaHandler.listaManga = lista;
    this.filterSelect.nome.set('');
    this.aggiornamentoManga = false;
    this.loadingService.hide();
  }

  private identificaPreferiti(mangaUtente: MangaUtente): void {
    if (mangaUtente?.preferiti) {
      this.mangaHandler.mangaUtente = mangaUtente;
      const arrayIdPreferiti: number[] = mangaUtente.preferiti
        .split(',')
        .map(Number);

      arrayIdPreferiti.forEach(
        (valore) => (this.mangaPreferiti[valore] = true)
      );
    }
  }

  private caricamentoFallito(): void {
    this.erroreHttp = true;
    this.loadingService.hide();
  }

  onGenreChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filterSelect.genere.set(target.value);
  }

  private upsertOnDestroy($event: BeforeUnloadEvent | null): void {
    const ma = this.mangaHandler;

    const condEquals: boolean = !compareObjectCustom(
      ma.mangaUtente,
      ma.initialMangaUtente
    );

    if (this.idUtente && condEquals) {
      $event ? $event.preventDefault() : null;
      this.mangaHandler.postOrUpdateMangaUtente(
        ma.mangaUtente,
        this.idUtente || ''
      );
    }
  }
}
