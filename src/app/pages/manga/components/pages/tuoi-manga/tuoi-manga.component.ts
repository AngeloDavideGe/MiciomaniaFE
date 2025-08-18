import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataHttp } from '../../../../../core/api/http.data';
import { effectTimeoutCustom } from '../../../../../shared/functions/utilities.function';
import {
  ListaManga,
  MangaUtente,
} from '../../../../../shared/interfaces/http.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import {
  createSezioneMangaUtente,
  voidSplitManga,
} from '../../../functions/manga.functions';
import { inizializzaLista } from '../../../handlers/manga.handler';
import { PulsantiManga } from '../../../interfaces/filtri.interface';
import {
  keyofMangaUtente,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../../../interfaces/manga.interface';
import { MangaService } from '../../../services/manga.service';
import { tuoi_manga_imports } from './imports/tuoi-manga.import';

@Component({
  selector: 'app-tuoi-manga',
  standalone: true,
  imports: tuoi_manga_imports,
  templateUrl: './tuoi-manga.component.html',
})
export class TuoiMangaComponent implements OnInit, OnDestroy {
  public mangaService = inject(MangaService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  public selectedTab: keyofMangaUtente = 'preferiti';
  public erroreHttp: boolean = false;
  private checkSplitManga: SplitMangaUtente = voidSplitManga();
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
    effectTimeoutCustom<string>(this.searchQuery, (value: string) =>
      this.debouncedSearchQuery.set(value)
    );
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
    DataHttp.mangaUtente = mangaUtente;
  }

  private computedallMangaSearch(): ListaManga[] {
    const search: string = this.debouncedSearchQuery().toLowerCase().trim();
    if (search) {
      return DataHttp.listaManga().filter((manga: ListaManga) =>
        manga.nome.toLowerCase().includes(search)
      );
    } else {
      return [] as ListaManga[];
    }
  }

  private loadListaManga(idUtente: string | null): void {
    if (!DataHttp.mangaScaricati) {
      DataHttp.listaManga().length == 0 ? this.loadingService.show() : null;

      inizializzaLista({
        mangaService: this.mangaService,
        idUtente: idUtente,
        caricaMangaUtente: (manga_utente: MangaUtente) =>
          (DataHttp.mangaUtente = manga_utente),
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
    DataHttp.listaManga.set(lista);
    this.copiaSplitUtente();
    this.filterMangaFunc('preferiti');
    this.loadingService.hide();
  }

  private copiaSplitUtente(): void {
    this.sezioneListaManga.set(
      createSezioneMangaUtente(DataHttp.mangaUtente, DataHttp.listaManga())
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
      const mangaTrovato: ListaManga | undefined = DataHttp.listaManga().find(
        (x) => x.id == idManga
      );

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
    tabPush: keyofMangaUtente
  ): void {
    const valoriDaSpostare: number[] = this.checkSplitManga[tabRemove];
    const mangaDaAggiungere: ListaManga[] = DataHttp.listaManga().filter(
      (manga: ListaManga) => valoriDaSpostare.includes(manga.id)
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
    const checkSplitMangaSet = new Set<number>(this.checkSplitManga[tabRemove]);

    this.sezioneListaManga.update((sezione) => ({
      ...sezione,
      [tabRemove]: sezione[tabRemove].filter(
        (x: ListaManga) => !checkSplitMangaSet.has(x.id)
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
