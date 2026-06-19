import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { iTab } from '../../../../../../library/components/tabs/tabs.component';
import { effectTimeoutCustom } from '../../../../../../library/functions/debounce.function';
import { NavBarButton } from '../../../../../../library/interfaces/navbar.interface';
import { DataHttp } from '../../../../../core/api/http.data';
import { MangaUtente } from '../../../../../shared/interfaces/http.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import {
  createSezioneMangaUtente,
  voidSplitManga,
} from '../../../functions/manga.functions';
import { getTabsTuoiManga } from '../../../functions/pulsanti-manga.functions';
import { inizializzaLista } from '../../../handlers/manga.handler';
import {
  keyofMangaUtente,
  ListaManga,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../../../interfaces/manga.interface';
import { MangaService } from '../../../services/manga.service';
import { tuoi_manga_imports } from './tuoi-manga.import';

@Component({
  selector: 'app-tuoi-manga',
  standalone: true,
  imports: tuoi_manga_imports,
  templateUrl: './tuoi-manga.component.html',
})
export class TuoiMangaComponent implements OnInit, OnDestroy {
  public mangaService = inject(MangaService);
  private router = inject(Router);

  public selectedTab: keyofMangaUtente = 'preferiti';
  public tabs = signal<iTab[]>([]);
  private checkSplitManga: SplitMangaUtente = voidSplitManga();
  public searchQuery = signal<string>('');
  public pulsanti: NavBarButton[] = [];
  private debouncedSearchQuery = signal<string>('');
  public selezionaOpera: Function = (path: string) => window.open(path);

  public allMangaSearch = computed<ListaManga[]>(() =>
    this.computedallMangaSearch(),
  );

  public mangaNonVuoti = computed<boolean>(() => {
    const listaManga: ListaManga[] = this.mangaService.listaManga();
    return listaManga.length > 0;
  });

  public sezioneListaManga = signal<SezioniMangaUtente>({
    preferiti: [],
    letti: [],
    completati: [],
  });

  constructor() {
    this.loadLanguage();

    effectTimeoutCustom<string>(this.searchQuery, (value: string) =>
      this.debouncedSearchQuery.set(value),
    );

    effect(() => {
      const listaManga: ListaManga[] = this.mangaService.listaManga();
      if (listaManga) {
        this.caricaManga(listaManga);
      }
    });
  }

  ngOnInit(): void {
    const user: User | null = DataHttp.user();

    if (DataHttp.mangaLoaded) {
      return;
    }

    inizializzaLista({
      mangaService: this.mangaService,
      idUtente: user ? user.id : '',
      caricaMangaUtente: (manga_utente: MangaUtente) =>
        DataHttp.mangaUtente.set(manga_utente),
      caricaListaManga: (lista_manga: ListaManga[]) =>
        this.caricaManga(lista_manga),
    });

    DataHttp.mangaLoaded = true;
  }

  ngOnDestroy(): void {
    const mangaUtente: MangaUtente = {
      preferiti: this.sezioneListaManga()
        .preferiti.map((x: ListaManga) => x.id)
        .join(', '),
      letti: this.sezioneListaManga()
        .letti.map((x: ListaManga) => x.id)
        .join(', '),
      completati: this.sezioneListaManga()
        .completati.map((x: ListaManga) => x.id)
        .join(', '),
    } as MangaUtente;
    DataHttp.mangaUtente.set(mangaUtente);
  }

  private loadLanguage(): void {
    this.pulsanti = [
      {
        action: () => this.router.navigate(['/manga']),
        title: 'Tutti i manga',
        icon: 'bi bi-book',
      },
    ];

    this.tabs.set(
      getTabsTuoiManga((tab: keyofMangaUtente) => this.filterMangaFunc(tab)),
    );
  }

  private computedallMangaSearch(): ListaManga[] {
    const search: string = this.debouncedSearchQuery().toLowerCase().trim();
    if (search) {
      return this.mangaService
        .listaManga()
        .filter((manga: ListaManga) =>
          manga.nome.toLowerCase().includes(search),
        );
    } else {
      return [] as ListaManga[];
    }
  }

  private caricaManga(lista: ListaManga[]): void {
    this.mangaService.listaManga.set(lista);
    this.copiaSplitUtente();
    this.filterMangaFunc('preferiti');
  }

  private copiaSplitUtente(): void {
    this.sezioneListaManga.set(
      createSezioneMangaUtente(
        DataHttp.mangaUtente() || ({} as MangaUtente),
        this.mangaService.listaManga(),
      ),
    );
  }

  private filterMangaFunc(tab: keyofMangaUtente): Function {
    const func: Function = () => {
      this.searchQuery.set('');
      this.selectedTab = tab;
      this.checkSplitManga = voidSplitManga();
    };

    return func;
  }

  rimuoviMangaTab(idManga: number): void {
    this.sezioneListaManga.update((sezioni) => ({
      ...sezioni,
      [this.selectedTab]: sezioni[this.selectedTab].filter(
        (x: ListaManga) => x.id !== idManga,
      ),
    }));
  }

  aggiungiMangaTab(idManga: number) {
    if (
      !this.sezioneListaManga()
        [this.selectedTab].map((x: ListaManga) => x.id)
        .includes(idManga)
    ) {
      const mangaTrovato: ListaManga | undefined = this.mangaService
        .listaManga()
        .find((x: ListaManga) => x.id == idManga);

      if (mangaTrovato) {
        this.sezioneListaManga.update((sezioni) => ({
          ...sezioni,
          [this.selectedTab]: [...sezioni[this.selectedTab], mangaTrovato],
        }));
      }
    }

    this.searchQuery.set('');
  }

  onSelezionato(checkbox: boolean, idManga: number): void {
    if (checkbox) {
      this.checkSplitManga[this.selectedTab].push(idManga);
    } else {
      this.checkSplitManga[this.selectedTab] = this.checkSplitManga[
        this.selectedTab
      ].filter((x: number) => x != idManga);
    }
  }

  spostaMangaSelezionati(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case 'Letti':
        if (this.selectedTab != 'letti') {
          this.changeCheckManga('completati', 'letti');
        }
        break;
      case 'Completati':
        if (this.selectedTab != 'completati') {
          this.changeCheckManga('letti', 'completati');
        }
        break;
      case 'Elimina':
        this.deleteCheckManga(this.selectedTab);
        break;
    }
    (event.target as HTMLSelectElement).value = '';
  }

  private changeCheckManga(
    tabRemove: keyofMangaUtente,
    tabPush: keyofMangaUtente,
  ): void {
    const valoriDaSpostare: number[] = this.checkSplitManga[tabRemove];
    const mangaDaAggiungere: ListaManga[] = this.mangaService
      .listaManga()
      .filter((manga: ListaManga) => valoriDaSpostare.includes(manga.id));

    mangaDaAggiungere.forEach((manga: ListaManga) => {
      if (!this.sezioneListaManga()[tabPush].some((x) => x.id == manga.id)) {
        this.sezioneListaManga.update((sezioni) => ({
          ...sezioni,
          [tabPush]: [...sezioni[tabPush], manga],
        }));
      }
    });

    this.deleteCheckManga(tabRemove);
  }

  private deleteCheckManga(tabRemove: keyofMangaUtente): void {
    const checkSplitMangaSet = new Set<number>(this.checkSplitManga[tabRemove]);

    this.sezioneListaManga.update((sezione) => ({
      ...sezione,
      [tabRemove]: sezione[tabRemove].filter(
        (x: ListaManga) => !checkSplitMangaSet.has(x.id),
      ),
    }));

    this.checkSplitManga = voidSplitManga();
  }
}
