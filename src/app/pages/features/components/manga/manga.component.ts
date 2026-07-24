import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import {
  FiltriInterface,
  InputFiltri,
} from '../../../../../library/interfaces/pagination.interface';
import {
  AllManga,
  iManga,
  Manga,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { getMangaSidebar, getMangaTabs } from './functions/manga.function';
import { manga_imports } from './manga.import';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';

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
  public readonly tabs = getMangaTabs();

  public searchQuery = signal<string>('');
  public debaunceQuery = signal<string>('');
  public currentCategoria = signal<string>('ufficiali');
  public currentTabs = signal<boolean | null>(null);

  public manga = computed<iCard[]>(() => this.mangaComputed('listaManga'));
  public mangaMicio = computed<iCard[]>(() => this.mangaComputed('micioManga'));
  public viewSpinner = computed<boolean>(() => !this.opereService.manga());

  public filtriManga = GetFiltriCustom<iCard, boolean | null>(
    this.mangaFiltri(this.manga),
  );
  public filtriMicio = GetFiltriCustom<iCard, boolean | null>(
    this.mangaFiltri(this.mangaMicio),
  );

  public filtri = computed<FiltriInterface<iCard>>(() => {
    const categoria: string = this.currentCategoria();

    if (categoria == 'ufficiali') {
      return this.filtriManga;
    } else {
      return this.filtriMicio;
    }
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debaunceQuery.set(value),
    );
  }

  ngOnInit(): void {
    handlerFunc<AllManga>({
      skipCall: this.opereService.mangaLoaded,
      callHttp: () => this.opereService.getAllManga('indykun'),
      nextCall: (data: AllManga) => this.opereService.manga.set(data),
      errorCall: () => (this.opereService.mangaLoaded = false),
    });

    this.opereService.mangaLoaded = true;
  }

  private mangaComputed(key: keyof iManga): iCard[] {
    const manga: AllManga | null = this.opereService.manga();

    if (manga) {
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
    } else {
      return [];
    }
  }

  private mangaFiltri(
    manga: Signal<iCard[]>,
  ): InputFiltri<iCard, boolean | null> {
    return {
      elemTable: manga,
      select: [
        {
          key: 'titolo',
          query: this.debaunceQuery,
        },
        {
          key: 'descrizione',
          query: this.debaunceQuery,
        },
      ],
      tabs: {
        key: 'tabFiltro',
        query: this.currentTabs,
      },
    };
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
}
