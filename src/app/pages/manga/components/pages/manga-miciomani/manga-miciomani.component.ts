import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { DataHttp } from '../../../../../core/api/http.data';
import { MangaParodia } from '../../../../../shared/interfaces/elementiUtente.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/class/mangaSong.utilities';
import { mangaMiciomania_imports } from './imports/manga-miciomania.import';
import {
  MmicioLang,
  MmicioLangType,
} from './languages/interfaces/mmicio-lang.interface';
import { NavBarButton } from '../../../../../shared/components/custom/navbar-custom.component';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: mangaMiciomania_imports,
  templateUrl: './manga-miciomani.component.html',
})
export class MangaMiciomaniComponent implements OnInit {
  public euService = inject(ElementiUtenteService);
  public router = inject(Router);

  public readonly mangaDefaultPic: string = environment.defaultPicsUrl.manga;
  public mangaSongUtilities = new MangaSongUtilities();
  public mmicioLang: MmicioLang = {} as MmicioLang;
  public pulsanti: NavBarButton[] = [];

  public elem = computed<MangaParodia | null>(() =>
    this.euService.mangaParodia(),
  );

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
    if (!this.euService.caricamentoManga) {
      this.euService.caricamentoManga = true;
      this.euService
        .getListaMangaMiciomani()
        .pipe(take(1))
        .subscribe({
          next: (data: MangaParodia) => this.euService.mangaParodia.set(data),
          error: (error) => {
            this.euService.caricamentoManga = false;
            console.error('Errore nel recupero dei manga', error);
          },
        });
    }
  }
}
