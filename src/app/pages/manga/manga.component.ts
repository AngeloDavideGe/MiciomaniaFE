import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { PulsantiHeader } from '../../shared/components/custom/header-custom.component';
import {
  compareObjectCustom,
  effectTimeoutCustom,
} from '../../shared/functions/utilities.function';
import { Lingua, MangaUtente } from '../../shared/interfaces/http.interface';
import { GetFiltriCustom } from '../../shared/utilities/pagination.utilities';
import { alfabetoManga } from './constants/alfabeto.constant';
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
import { TabsManga } from './interfaces/filtri.interface';
import { ListaManga } from './interfaces/manga.interface';
import {
  MangaLang,
  MangaLangType,
} from './languages/interfaces/manga-lang.interface';
import { MangaService } from './services/manga.service';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
})
export class MangaComponent implements OnDestroy {
  public mangaService = inject(MangaService);
  private router = inject(Router);

  public readonly mangaGeneri: string[] = generiManga;
  public readonly alfabeto: string[] = alfabetoManga;
  public mangaPreferiti: boolean[] = [];
  public mangaLang: MangaLang = {} as MangaLang;
  public idUtente: string | null = null;
  public erroreHttp = signal<boolean>(false);
  public perIniziale = signal<string>('lista');
  public selezionaOpera: Function = (path: string) => window.open(path);

  public pulsanti: PulsantiHeader[] = getPulsanti((path: string) =>
    this.router.navigate([path]),
  );

  private debounce = {
    autore: signal<string>(''),
    nome: signal<string>(''),
  };

  public filterSelect = {
    genere: signal<string>(''),
    autore: signal<string>(''),
    nome: signal<string>(''),
    tabBoolean: signal<boolean | null>(null),
  };

  public mangaNonVuoti = computed<boolean>(() => {
    const listaManga: ListaManga[] = this.mangaService.listaManga();
    return listaManga.length > 0;
  });

  public mangaPerIniziale = computed<Record<string, ListaManga[]>>(() => {
    const listaManga: ListaManga[] = this.mangaService.listaManga();
    const raggruppamento: Record<string, ListaManga[]> = {};

    alfabetoManga.forEach((lettera: string) => {
      raggruppamento[lettera] = [];
    });

    listaManga.forEach((manga: ListaManga) => {
      const iniziale: string = manga.nome.charAt(0).toUpperCase();
      raggruppamento[iniziale].push(manga);
    });

    return raggruppamento;
  });

  public filtri = GetFiltriCustom<ListaManga, boolean>({
    elemTable: this.mangaService.listaManga,
    select: [
      {
        key: 'nome',
        query: this.debounce.nome,
      },
      {
        key: 'autore',
        query: this.debounce.autore,
      },
      {
        key: 'genere',
        query: this.filterSelect.genere,
      },
    ],
    tabs: {
      key: 'completato',
      query: this.filterSelect.tabBoolean,
    },
  });

  public tabs: TabsManga[] = getTabsManga(
    (cond: boolean | null, index: number) =>
      this.getTabClickHandler(cond, index),
  );

  public isManga$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({
      url: this.router.url,
    }),
    map((event) => event.url == '/manga'),
    tap((isManga: boolean) => (isManga ? this.loadFilteredManga() : null)),
  );

  constructor() {
    this.loadLanguage();

    effectTimeoutCustom(this.filterSelect.autore, (value: string) =>
      this.debounce.autore.set(value),
    );

    effectTimeoutCustom(this.filterSelect.nome, (value: string) =>
      this.debounce.nome.set(value),
    );

    effect(() => {
      const mangaUtente: MangaUtente | null = DataHttp.mangaUtente();
      if (mangaUtente) {
        this.identificaPreferiti(mangaUtente);
      }
    });

    effect(() => {
      const listaManga: ListaManga[] = this.mangaService.listaManga();
      if (listaManga) {
        this.caricaManga(listaManga);
      }
    });
  }

  ngOnDestroy(): void {
    this.upsertOnDestroy(null);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    this.upsertOnDestroy($event);
  }

  private loadLanguage(): void {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<MangaLangType>> = {
      it: () => import('./languages/constants/manga-it.constant'),
      en: () => import('./languages/constants/manga-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.mangaLang = m.mangaLang));
  }

  private getTabClickHandler(
    condition: boolean | null,
    index: number,
  ): Function {
    const func: Function = () => {
      if (this.filterSelect.tabBoolean() == condition) return;

      this.filterSelect.tabBoolean.set(condition);
      this.tabs.forEach((tab, i) => {
        tab.class = i === index ? 'active' : '';
      });
    };

    return func;
  }

  private loadFilteredManga(): void {
    const user = DataHttp.user();
    this.idUtente = user ? user.id : null;

    inizializzaLista({
      mangaService: this.mangaService,
      idUtente: this.idUtente || '',
      caricaMangaUtente: (mangaUtente: MangaUtente) =>
        this.identificaPreferiti(mangaUtente),
      caricaListaManga: (listaManga: ListaManga[]) =>
        this.caricaManga(listaManga),
      caricamentoFallito: () => this.erroreHttp.set(true),
    });
  }

  private caricaManga(lista: ListaManga[]): void {
    this.mangaService.listaManga.set(lista);
    this.filterSelect.nome.set('');
  }

  private identificaPreferiti(mangaUtente: MangaUtente): void {
    if (mangaUtente?.preferiti) {
      DataHttp.mangaUtente.set(mangaUtente);
      const arrayIdPreferiti: number[] = mangaUtente.preferiti
        .split(',')
        .map(Number);

      arrayIdPreferiti.forEach(
        (valore: number) => (this.mangaPreferiti[valore] = true),
      );
    }
  }

  private upsertOnDestroy($event: BeforeUnloadEvent | null): void {
    if (!DataHttp.mangaUtente() || !this.idUtente) {
      return;
    }

    const condEquals: boolean = !compareObjectCustom(
      DataHttp.mangaUtente(),
      DataHttp.initialMangaUtente,
    );

    if (condEquals) {
      $event ? $event.preventDefault() : null;

      postOrUpdateMangaUtente({
        mangaService: this.mangaService,
        mangaUtente: DataHttp.mangaUtente()!,
        idUtente: this.idUtente || '',
      });
    }
  }
}
