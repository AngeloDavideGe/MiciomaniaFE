import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../../shared/interfaces/users.interface';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import {
  createSezioneMangaUtente,
  voidSplitManga,
} from '../../../functions/manga.functions';
import { MangaHandler } from '../../../handlers/manga.handler';
import { PulsantiManga } from '../../../interfaces/filtri.interface';
import {
  keyofMangaUtente,
  ListaManga,
  MangaUtente,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../../../interfaces/manga.interface';
import { tuoi_manga_imports } from './imports/tuoi-manga.import';
import { DataHttp } from '../../../../../core/api/http.data';

@Component({
  selector: 'app-tuoi-manga',
  standalone: true,
  imports: tuoi_manga_imports,
  templateUrl: './tuoi-manga.component.html',
})
export class TuoiMangaComponent implements OnInit, OnDestroy {
  public mangaHandler = inject(MangaHandler);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  public selectedTab: keyofMangaUtente = 'preferiti';
  public erroreHttp: boolean = false;
  private checkSplitManga: SplitMangaUtente = voidSplitManga();
  private searchTimeout: any;
  public searchQuery = signal<string>('');
  private debouncedSearchQuery = signal<string>('');
  public allMangaSearch: Signal<ListaManga[]> = computed(() =>
    this.computedallMangaSearch()
  );
  public sezioneListaManga = signal<SezioniMangaUtente>({
    preferiti: [],
    letti: [],
    completati: [],
  });
  public pulsanti: PulsantiManga[] = [
    {
      click: () => this.router.navigate(['/manga']),
      disabled: false,
      titolo: '📚 Cerca tutti i manga',
      icona: '',
    },
  ];

  constructor() {
    effect(() => {
      const value: string = this.searchQuery();
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.debouncedSearchQuery.set(value);
      }, 300);
    });
  }

  ngOnInit(): void {
    const user: User | null = DataHttp.user();
    if (user) {
      this.loadListaManga(user.id);
    } else {
      this.router.navigate(['/manga']);
    }
  }

  ngOnDestroy(): void {
    const mangaUtente: MangaUtente = {
      preferiti: this.sezioneListaManga()
        .preferiti.map((x) => x.id)
        .join(', '),
      letti: this.sezioneListaManga()
        .letti.map((x) => x.id)
        .join(', '),
      completati: this.sezioneListaManga()
        .completati.map((x) => x.id)
        .join(', '),
    } as MangaUtente;
    this.mangaHandler.mangaUtente = mangaUtente;
  }

  private computedallMangaSearch(): ListaManga[] {
    const search: string = this.debouncedSearchQuery().toLowerCase().trim();
    if (search) {
      return this.mangaHandler.listaManga.filter((manga) =>
        manga.nome.toLowerCase().includes(search)
      );
    } else {
      return [] as ListaManga[];
    }
  }

  private loadListaManga(idUtente: string | null): void {
    const ms = this.mangaHandler;
    if (!ms.mangaScaricati) {
      ms.listaManga.length == 0 ? this.loadingService.show() : null;

      this.mangaHandler.inizializzaLista({
        idUtente: idUtente,
        caricaMangaUtente: (manga_utente: MangaUtente) =>
          (this.mangaHandler.mangaUtente = manga_utente),
        caricaListaManga: (lista_manga: ListaManga[]) =>
          this.caricaManga(lista_manga),
        caricamentoFallito: () => this.caricamentoFallito(),
      });
    } else {
      this.copiaSplitUtente();
      this.filterMangaFunc('preferiti');
      this.loadingService.hide();
    }
  }

  private caricamentoFallito(): void {
    this.erroreHttp = true;
    this.loadingService.hide();
  }

  private caricaManga(lista: ListaManga[]): void {
    this.mangaHandler.listaManga = lista;
    this.copiaSplitUtente();
    this.filterMangaFunc('preferiti');
    this.loadingService.hide();
  }

  private copiaSplitUtente(): void {
    this.sezioneListaManga.set(
      createSezioneMangaUtente(
        this.mangaHandler.mangaUtente,
        this.mangaHandler.listaManga
      )
    );
  }

  filterMangaFunc(tab: keyofMangaUtente): void {
    this.searchQuery.set('');
    this.selectedTab = tab;
    this.checkSplitManga = voidSplitManga();
  }

  rimuoviMangaTab(idManga: number): void {
    this.sezioneListaManga.update((sezioni) => ({
      ...sezioni,
      [this.selectedTab]: sezioni[this.selectedTab].filter(
        (x) => x.id !== idManga
      ),
    }));
  }

  aggiungiMangaTab(idManga: number) {
    if (
      !this.sezioneListaManga()
        [this.selectedTab].map((x) => x.id)
        .includes(idManga)
    ) {
      const mangaTrovato: ListaManga | undefined =
        this.mangaHandler.listaManga.find((x) => x.id == idManga);

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
      ].filter((x) => x != idManga);
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
    tabPush: keyofMangaUtente
  ): void {
    const valoriDaSpostare: number[] = this.checkSplitManga[tabRemove];
    const mangaDaAggiungere: ListaManga[] = this.mangaHandler.listaManga.filter(
      (manga) => valoriDaSpostare.includes(manga.id)
    );

    mangaDaAggiungere.forEach((manga) => {
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
    const checkSplitMangaSet = new Set(this.checkSplitManga[tabRemove]);

    this.sezioneListaManga.update((sezione) => ({
      ...sezione,
      [tabRemove]: sezione[tabRemove].filter(
        (x) => !checkSplitMangaSet.has(x.id)
      ),
    }));

    this.checkSplitManga = voidSplitManga();
  }

  selezionaOpera(manga: ListaManga) {
    this.router.navigate(['manga/', manga.path], {
      state: { message: this.constructor.name },
    });
  }
}
