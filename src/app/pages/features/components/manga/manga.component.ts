import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import {
  iManga,
  Manga,
  MangaGet,
  MangaUtente,
  OpereToolbar,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import {
  defaultMangaArrayPags,
  getMangaSidebar,
  getMangaSidebarSub,
  getMangaTabs,
  getMangaToolbar,
} from './functions/manga.function';
import { manga_imports } from './manga.import';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent implements OnInit {
  private opereService = inject(OpereService);

  public readonly categorie = getMangaSidebar();
  public readonly sottoCategorie = getMangaSidebarSub();
  public readonly tabs = getMangaTabs();
  public readonly arrayRaggi = defaultMangaArrayPags();

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public currentCategoria = signal<string>('ufficiali');
  public currentSottoCategoria = signal<string>('tutti');
  public currentTabs = signal<boolean | null>(null);
  public mangaToolbar = signal<OpereToolbar[]>(getMangaToolbar(0, 0));

  public viewSpinner = computed<boolean>(() => !this.opereService.manga());

  public manga = computed<iCard[]>(() => this.mangaComputed('listaManga'));
  public mangaMicio = computed<iCard[]>(() => this.mangaComputed('micioManga'));

  public mangaPreferiti = computed<iCard[]>(() =>
    this.mangaPreferitiComputed('listaManga', 'manga'),
  );
  public mangaMicioPreferiti = computed<iCard[]>(() =>
    this.mangaPreferitiComputed('micioManga', 'mangamicio'),
  );

  public filtri = computed<FiltriInterface<iCard>>(() => {
    const categoria: string = this.currentCategoria();
    const sottoCategoria: string = this.currentSottoCategoria();

    if (categoria == 'ufficiali') {
      if (sottoCategoria == 'preferiti') {
        return this.mangaFiltri(this.mangaPreferiti);
      } else {
        return this.mangaFiltri(this.manga);
      }
    } else {
      if (sottoCategoria == 'preferiti') {
        return this.mangaFiltri(this.mangaMicioPreferiti);
      } else {
        return this.mangaFiltri(this.mangaMicio);
      }
    }
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debounceQuery.set(value),
    );

    effect(() => this.setMangaToolbar(this.opereService.manga()));
  }

  ngOnInit(): void {
    handlerFunc<MangaGet>({
      skipCall: this.opereService.mangaLoaded,
      callHttp: () => this.opereService.getManga('indykun'),
      nextCall: (data: MangaGet) => {
        this.opereService.manga.set(data.manga);
        this.opereService.mangaUtente.set(data.mangaUtente);
      },
      errorCall: () => (this.opereService.mangaLoaded = false),
    });

    this.opereService.mangaLoaded = true;
  }

  private mangaComputed(key: keyof iManga): iCard[] {
    const manga: iManga | null = this.opereService.manga();

    if (!manga) return [];

    return manga[key].map((x: Manga) => {
      const card: iCard = {
        titolo: x.nome,
        urlPic: x.copertina,
        descrizione: x.genere,
        bottone: 'Leggi',
        tabFiltro: x.completato,
        azione: () => {},
      };

      return card;
    });
  }

  private mangaPreferitiComputed(
    key: keyof iManga,
    preferitiKey: keyof MangaUtente,
  ): iCard[] {
    const manga: iManga | null = this.opereService.manga();
    const preferiti: string | null | undefined =
      this.opereService.mangaUtente()?.[preferitiKey];

    if (!preferiti || !manga) return [];

    let recordPreferiti: Record<string, boolean> = {};
    let mangaPreferite: Manga[] = [];

    preferiti.split(',').forEach((id: string) => {
      recordPreferiti[id] = true;
    });

    manga[key].forEach((manga: Manga) => {
      if (recordPreferiti[manga.id.toString()]) {
        mangaPreferite.push(manga);
      }
    });

    return mangaPreferite.map((x: Manga) => {
      const card: iCard = {
        titolo: x.nome,
        urlPic: x.copertina,
        descrizione: x.genere,
        bottone: 'Leggi',
        tabFiltro: x.completato,
        azione: () => {},
      };

      return card;
    });
  }

  private mangaFiltri(manga: Signal<iCard[]>): FiltriInterface<iCard> {
    return GetFiltriCustom<iCard, boolean | null>({
      elemTable: manga,
      select: [
        {
          key: 'titolo',
          query: this.debounceQuery,
        },
        {
          key: 'descrizione',
          query: this.debounceQuery,
        },
      ],
      tabs: {
        key: 'tabFiltro',
        query: this.currentTabs,
      },
    });
  }

  public changeTab(value: string): void {
    switch (value) {
      case 'in_corso': {
        this.currentTabs.set(false);
        break;
      }
      case 'completati': {
        this.currentTabs.set(true);
        break;
      }
      case 'tutti': {
        this.currentTabs.set(null);
        break;
      }
    }
  }

  private setMangaToolbar(data: iManga | null): void {
    if (!data) return;

    let capitoliTotali: number = 0;
    const mangaDisponibili: number =
      data.listaManga.length + data.micioManga.length;

    data.listaManga.forEach((x: Manga) => (capitoliTotali += x.capitoli));
    data.micioManga.forEach((x: Manga) => (capitoliTotali += x.capitoli));

    this.mangaToolbar.set(getMangaToolbar(mangaDisponibili, capitoliTotali));
  }
}
