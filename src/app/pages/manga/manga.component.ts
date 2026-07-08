import {
  Component,
  effect,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { iTab } from '../../../library/components/tabs/tabs-indy.component';
import { compareObjectCustom } from '../../../library/functions/confronto.function';
import { effectTimeoutCustom } from '../../../library/functions/debounce.function';
import { GetFiltriCustom } from '../../../library/functions/pagination.function';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { NavBarButton } from '../../../library/interfaces/navbar.interface';
import { DataHttp } from '../../core/api/http.data';
import { MangaUtente } from '../../shared/interfaces/http.interface';
import { generiManga } from './constants/genere.constant';
import {
  getPulsanti,
  getTabsManga,
} from './functions/pulsanti-manga.functions';
import {
  inizializzaLista,
  postOrUpdateMangaUtente,
} from './handlers/manga.handler';
import { ListaManga } from './interfaces/manga.interface';
import { manga_imports } from './manga.imports';
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
  public mangaPreferiti: boolean[] = [];
  public idUtente: string | null = null;
  public selezionaOpera: Function = (path: string) => window.open(path);
  public pulsanti: NavBarButton[] = getPulsanti((path: string) =>
    this.router.navigate([path]),
  );

  public tabs: iTab[] = getTabsManga((cond: boolean | null) => {
    if (this.filterSelect.tabBoolean() !== cond) {
      this.filterSelect.tabBoolean.set(cond);
    }
  });

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

  public filtri = GetFiltriCustom<ListaManga, boolean>({
    elemTable: this.mangaService.listaManga,
    tipoSelect: 'every',
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

  public isManga$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/manga',
    tapFunc: (isManga: boolean) => (isManga ? this.loadFilteredManga() : null),
  });

  constructor() {
    (['autore', 'nome'] as const).forEach((x) => {
      effectTimeoutCustom<string>(this.filterSelect[x], (value: string) =>
        this.debounce[x].set(value),
      );
    });

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

  private loadFilteredManga(): void {
    const user = DataHttp.user();
    this.idUtente = user ? user.id : null;

    if (DataHttp.mangaLoaded) {
      return;
    }

    inizializzaLista({
      mangaService: this.mangaService,
      idUtente: this.idUtente || '',
      caricaMangaUtente: (mangaUtente: MangaUtente) =>
        this.identificaPreferiti(mangaUtente),
      caricaListaManga: (listaManga: ListaManga[]) =>
        this.caricaManga(listaManga),
    });

    DataHttp.mangaLoaded = true;
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
