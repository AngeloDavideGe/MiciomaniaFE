import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DataHttp } from '../../../../../core/api/http.data';
import { MangaParodia } from '../../../../../shared/interfaces/elementiUtente.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import { PulsantiManga } from '../../../interfaces/filtri.interface';
import { DettagliMangaComponent } from '../../../shared/dettagli-manga.component';
import { CardMangaMiciomaniaComponent } from './components/card-mangaMiciomania.component';
import {
  MmicioLang,
  MmicioLangType,
} from './languages/interfaces/mmicio-lang.interface';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: [DettagliMangaComponent, CardMangaMiciomaniaComponent],
  templateUrl: './manga-miciomani.component.html',
})
export class MangaMiciomaniComponent implements OnInit {
  public elementiUtenteService = inject(ElementiUtenteService);
  public router = inject(Router);
  private loadingService = inject(LoadingService);

  public mangaSongUtilities = new MangaSongUtilities();
  public mmicioLang: MmicioLang = {} as MmicioLang;
  public pulsanti: PulsantiManga[] = [
    {
      click: () => this.router.navigate(['/manga']),
      disabled: false,
      titolo: {
        it: '📚 Cerca tutti i manga',
        en: '📚 Search all manga',
      },
      icona: '',
    },
  ];

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<MmicioLangType>> = {
      it: () => import('./languages/constants/mmicio-it.constant'),
      en: () => import('./languages/constants/mmicio-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.mmicioLang = m.mmicioLang));
  }

  ngOnInit(): void {
    if (!this.elementiUtenteService.mangaParodia) {
      this.loadMangaMiciomani();
    }
  }

  private loadMangaMiciomani(): void {
    this.loadingService.show();

    this.elementiUtenteService
      .getListaMangaMiciomani()
      .pipe(take(1))
      .subscribe({
        next: (data: MangaParodia) => this.nextGetListaMangaMiciomani(data),
        error: (error) =>
          console.error('Errore nel recupero della lista dei manga', error),
      });
  }

  private nextGetListaMangaMiciomani(data: MangaParodia): void {
    this.elementiUtenteService.mangaParodia = data;
    this.loadingService.hide();
  }
}
