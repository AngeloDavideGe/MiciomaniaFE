import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { iCard } from '../../../../../../library/interfaces/card.interface';
import { NavBarButton } from '../../../../../../library/interfaces/navbar.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import { DataHttp } from '../../../../../core/api/http.data';
import {
  MangaParodia,
  MangaSong,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/class/mangaSong.utilities';
import { mangaMiciomania_imports } from './imports/manga-miciomania.import';
import {
  MmicioLang,
  MmicioLangType,
} from './languages/interfaces/mmicio-lang.interface';

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
  public mmicioLang: MmicioLang = {} as MmicioLang;
  public pulsanti: NavBarButton[] = [];

  public mangaUtente = computed<iCard[]>(() => {
    const mangaParodia: MangaParodia | null = this.euService.mangaParodia();

    if (mangaParodia) {
      return mangaParodia.mangaUtentePars.map((x: MangaSong) => {
        return {
          titolo: x.nome,
          urlPic: x.copertina || this.mangaDefaultPic,
          bottone: this.mmicioLang.scarica,
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
          bottone: this.mmicioLang.scarica,
          azione: () => this.mangaSongUtilities.downloadManga(x),
          descrizione: `Genere: <strong>${x.genere}</strong
            ><br />
            Autore: <em>${x.idUtente}</em>`,
        } as iCard;
      });
    }

    return [];
  });

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<MmicioLangType>> = {
      it: () => import('./languages/constants/mmicio-it.constant'),
      en: () => import('./languages/constants/mmicio-en.constant'),
    };
    languageMap[lingua]().then((m) => {
      this.mmicioLang = m.mmicioLang;

      this.pulsanti = [
        {
          action: () => this.router.navigate(['/manga']),
          title: this.mmicioLang.tuttiManga,
          icon: 'bi bi-book',
        },
      ];
    });
  }

  ngOnInit(): void {
    handlerFunc<MangaParodia>({
      skipCall: this.euService.mangaLoaded,
      callHttp: () => this.euService.getListaMangaMiciomani(),
      nextCall: (data: MangaParodia) => this.euService.mangaParodia.set(data),
      errorCall: () => (this.euService.mangaLoaded = false),
    });

    this.euService.mangaLoaded = true;
  }
}
