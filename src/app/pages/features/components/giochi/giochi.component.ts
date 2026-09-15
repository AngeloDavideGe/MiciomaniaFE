import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { isCurrentRoute } from '../../../../../library/functions/router.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import { uppercaseFirstLetter } from '../../../../../library/pipes/capitalize.pipe';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { defaultGiochiArrayPags, getGiochi } from './functions/giochi.function';
import { giochi_imports } from './giochi.import';

@Component({
  selector: 'app-giochi',
  standalone: true,
  imports: giochi_imports,
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss',
})
export class GiochiComponent implements OnInit {
  private appConfig = inject(AppConfigService);
  private router = inject(Router);

  public readonly lang = this.appConfig.lang.Giochi;
  public readonly arrayRaggi = defaultGiochiArrayPags();

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public currentDescrizione = signal({ Titolo: '...', Descrizione: '...' });

  public filtri = computed<FiltriInterface<iCard>>(() =>
    GetFiltriCustom<iCard, null>({
      elemTable: signal<iCard[]>(getGiochi(this.lang, this.router)),
      select: [
        { key: 'titolo', query: this.debounceQuery },
        { key: 'descrizione', query: this.debounceQuery },
      ],
    }),
  );

  public isGiochi$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/feature/giochi',
    mapFunc: (event: { url: string }) => {
      const url = event.url.split(/[?#]/)[0];

      if (url === '/feature/giochi') {
        this.currentDescrizione.set({
          Titolo: this.lang.Titolo,
          Descrizione: this.lang.Descrizione,
        });

        return true;
      }

      const giochiUrlIndex = url.split('/').indexOf('giochi');
      const gameRouteKey = url.split('/')[giochiUrlIndex + 1];
      const gameKey = gameRouteKey
        ? uppercaseFirstLetter(gameRouteKey)
        : undefined;
      const currentLang = gameKey ? this.lang.Lista[gameKey] : undefined;

      if (currentLang) {
        this.currentDescrizione.set({
          Titolo: currentLang.Titolo,
          Descrizione: currentLang.Descrizione,
        });
      } else {
        this.currentDescrizione.set({
          Titolo: this.lang.Titolo,
          Descrizione: this.lang.Descrizione,
        });
      }

      return false;
    },
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debounceQuery.set(value),
    );
  }

  ngOnInit(): void {}
}
