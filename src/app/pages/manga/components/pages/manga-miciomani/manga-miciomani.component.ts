import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { iCard } from '../../../../../../library/interfaces/card.interface';
import { NavBarButton } from '../../../../../../library/interfaces/navbar.interface';
import { SezioneScroll } from '../../../../../../library/interfaces/scroll.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import {
  MangaParodia,
  MangaSong,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/class/mangaSong.utilities';
import { mangaMiciomania_imports } from './imports/manga-miciomania.import';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: mangaMiciomania_imports,
  templateUrl: './manga-miciomani.component.html',
})
export class MangaMiciomaniComponent implements OnInit {
  public euService = inject(ElementiUtenteService);
  private appConfig = inject(AppConfigService);
  public router = inject(Router);

  public readonly mangaDefaultPic: string =
    this.appConfig.config.defaultPicsUrl.manga;

  public mangaSongUtilities = new MangaSongUtilities();
  public pulsanti: NavBarButton[] = [
    {
      action: () => this.router.navigate(['/manga']),
      title: 'Tutti i Manga',
      icon: 'bi bi-book',
    },
  ];

  public sezioni = computed<SezioneScroll[]>(() => {
    const mangaParodia: MangaParodia | null = this.euService.mangaParodia();

    if (mangaParodia) {
      return this.getSezioni(mangaParodia);
    } else {
      return [];
    }
  });

  public mangaUtente = computed<iCard[]>(() => {
    const mangaParodia: MangaParodia | null = this.euService.mangaParodia();

    if (mangaParodia) {
      return mangaParodia.mangaUtentePars.map((x: MangaSong) => {
        return {
          titolo: x.nome,
          urlPic: x.copertina || this.mangaDefaultPic,
          bottone: 'Scarica',
          azione: () => this.mangaSongUtilities.downloadManga(x),
          descrizione: `Genere: <strong>${x.genere}</strong
          ><br />
          Autore: <em>${x.idUtente}</em>`,
        } as iCard;
      });
    }

    return [];
  });

  public mangaMiciomania = computed<iCard[]>(() => {
    const mangaParodia: MangaParodia | null = this.euService.mangaParodia();

    if (mangaParodia) {
      return mangaParodia.mangaMiciomania.map((x: MangaSong) => {
        return {
          titolo: x.nome,
          urlPic: x.copertina || this.mangaDefaultPic,
          bottone: 'Scarica',
          azione: () => this.mangaSongUtilities.downloadManga(x),
          descrizione: `Genere: <strong>${x.genere}</strong
            ><br />
            Autore: <em>${x.idUtente}</em>`,
        } as iCard;
      });
    }

    return [];
  });

  ngOnInit(): void {
    handlerFunc<MangaParodia>({
      skipCall: this.euService.mangaLoaded,
      callHttp: () => this.euService.getListaMangaMiciomani(),
      nextCall: (data: MangaParodia) => this.euService.mangaParodia.set(data),
      errorCall: () => (this.euService.mangaLoaded = false),
    });

    this.euService.mangaLoaded = true;
  }

  private getSezioni(manga: MangaParodia): SezioneScroll[] {
    return [
      {
        id: 'MangaMiciomania',
        titolo: 'Manga Miciomania',
        lunghezza: manga.mangaMiciomania.length,
        icona: 'bi bi-arrow-down',
        nomeIcona: 'Vai a Manga Utente',
      },
      {
        id: 'MangaUtente',
        titolo: 'Manga Utente',
        lunghezza: manga.mangaUtentePars.length,
        icona: 'bi bi-arrow-up',
        nomeIcona: 'Torna a Manga Miciomania',
      },
    ];
  }
}
