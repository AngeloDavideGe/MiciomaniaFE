import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { getMangaSidebar, getMangaTabs } from './functions/manga.function';
import { manga_imports } from './manga.import';
import { iTab } from '../../../../../library/interfaces/tabs.interface';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { AllManga, Manga } from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';

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

  public manga = computed<iCard[]>(() => {
    const manga: AllManga | null = this.opereService.manga();

    if (manga) {
      return manga.listaManga.map((x: Manga) => {
        const card: iCard = {
          titolo: x.nome,
          urlPic: x.copertina,
          descrizione: x.genere,
          bottone: 'Leggi',
          color: 'var(--card)',
          azione: () => {},
        };

        return card;
      });
    } else {
      return [];
    }
  });

  public mangaMicio = computed<iCard[]>(() => {
    const manga: AllManga | null = this.opereService.manga();

    if (manga) {
      return manga.micioManga.map((x: Manga) => {
        const card: iCard = {
          titolo: x.nome,
          urlPic: x.copertina,
          descrizione: x.genere,
          bottone: 'Leggi',
          azione: () => {},
        };

        return card;
      });
    } else {
      return [];
    }
  });

  public filtri = GetFiltriCustom<iCard, null>({
    elemTable: this.manga,
    select: [
      {
        key: 'titolo',
        query: this.searchQuery,
      },
      {
        key: 'descrizione',
        query: this.searchQuery,
      },
    ],
  });

  ngOnInit(): void {
    handlerFunc<AllManga>({
      skipCall: this.opereService.mangaLoaded,
      callHttp: () => this.opereService.getAllManga('indykun'),
      nextCall: (data: AllManga) => this.opereService.manga.set(data),
      errorCall: () => (this.opereService.mangaLoaded = false),
    });

    this.opereService.mangaLoaded = true;
  }
}
