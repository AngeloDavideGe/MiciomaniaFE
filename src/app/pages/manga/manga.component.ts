import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  Signal,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import {
  compareObjectCustom,
  effectTimeoutCustom,
} from '../../shared/functions/utilities.function';
import {
  ListaManga,
  MangaUtente,
} from '../../shared/interfaces/http.interface';
import { LoadingService } from '../../shared/services/template/loading.service';
import { generiManga } from './constants/genere.constant';
import {
  getPulsanti,
  getTabsManga,
} from './functions/pulsanti-manga.functions';
import {
  inizializzaLista,
  postOrUpdateMangaUtente,
} from './handlers/manga.handler';
import { manga_imports } from './imports/manga.imports';
import { PulsantiManga, TabsManga } from './interfaces/filtri.interface';
import { MangaService } from './services/manga.service';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
})
export class MangaComponent implements OnDestroy {
  public mangaService = inject(MangaService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  public mangaPreferiti: boolean[] = [];
  public erroreHttp: boolean = false;
  public aggiornamentoManga: boolean = false;
  public mangaGeneri = generiManga;
  public idUtente: string | null = null;
  public pulsanti: PulsantiManga[] = getPulsanti((path: string) =>
    this.router.navigate([path])
  );

  private debounce = {
    autore: signal(''),
    nome: signal(''),
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
    (cond: boolean | null, index: number) =>
      this.getTabClickHandler(cond, index)
  );

  public isManga$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({
      url: this.router.url,
    }),
    map((event) => event.url == '/manga'),
    tap((isManga) => (isManga ? this.loadFilteredManga() : null))
  );

  constructor() {
    effectTimeoutCustom(this.filterSelect.autore, (value: string) =>
      this.debounce.autore.set(value)
    );

    effectTimeoutCustom(this.filterSelect.nome, (value: string) =>
      this.debounce.nome.set(value)
    );
  }

  ngOnDestroy(): void {
    this.upsertOnDestroy(null);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    this.upsertOnDestroy($event);
  }

  private getTabClickHandler(
    condition: boolean | null,
    index: number
  ): Function {
    return () => {
      if (this.filterSelect.tabBoolean() !== condition) {
        this.filterSelect.tabBoolean.set(condition);
        this.tabs.forEach((tab, i) => {
          tab.class = i === index ? 'active' : '';
        });
        this.logFilterChanges();
      }
    };
  }

  private logFilterChanges(): ListaManga[] {
    return DataHttp.listaManga().filter((manga) => {
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
    if (DataHttp.listaManga().length > 0 && DataHttp.mangaScaricati) {
      this.filterSelect.nome.set('');
      this.identificaPreferiti(DataHttp.mangaUtente);
      this.idUtente = DataHttp.user()?.id || null;
    } else {
      DataHttp.listaManga().length > 0 ? null : this.loadingService.show();
      this.aggiornamentoManga = true;
      this.sottoscrizioneUtente();
    }
  }

  private sottoscrizioneUtente(): void {
    const user = DataHttp.user();
    this.idUtente = user ? user.id : null;

    inizializzaLista({
      mangaService: this.mangaService,
      idUtente: this.idUtente,
      caricaMangaUtente: (manga_utente: MangaUtente) => {
        this.identificaPreferiti(manga_utente);
        DataHttp.initialMangaUtente = manga_utente;
      },
      caricaListaManga: (lista_manga: ListaManga[]) =>
        this.caricaManga(lista_manga),
      caricamentoFallito: () => this.caricamentoFallito(),
    });
  }

  private caricaManga(lista: ListaManga[]): void {
    DataHttp.listaManga.set(lista);
    this.filterSelect.nome.set('');
    this.aggiornamentoManga = false;
    this.loadingService.hide();
  }

  private identificaPreferiti(mangaUtente: MangaUtente): void {
    if (mangaUtente?.preferiti) {
      DataHttp.mangaUtente = mangaUtente;
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
    const condEquals: boolean = !compareObjectCustom(
      DataHttp.mangaUtente,
      DataHttp.initialMangaUtente
    );

    if (this.idUtente && condEquals) {
      $event ? $event.preventDefault() : null;

      postOrUpdateMangaUtente({
        mangaService: this.mangaService,
        mangaUtente: DataHttp.mangaUtente,
        idUtente: this.idUtente || '',
      });
    }
  }

  selezionaOpera(manga: ListaManga) {
    this.router.navigate(['manga/', manga.path], {
      state: { message: this.constructor.name },
    });
  }
}
