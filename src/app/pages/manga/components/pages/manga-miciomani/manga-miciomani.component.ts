import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DataHttp } from '../../../../../core/api/http.data';
import {
  HeaderCustomComponent,
  PulsantiHeader,
} from '../../../../../shared/components/custom/header-custom.component';
import { CustomScrollComponent } from '../../../../../shared/components/custom/scroll-custom.component';
import { MangaParodia } from '../../../../../shared/interfaces/elementiUtente.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import { CardMangaMiciomaniaComponent } from './components/card-mangaMiciomania.component';
import {
  MmicioLang,
  MmicioLangType,
} from './languages/interfaces/mmicio-lang.interface';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: [
    HeaderCustomComponent,
    CardMangaMiciomaniaComponent,
    CustomScrollComponent,
  ],
  templateUrl: './manga-miciomani.component.html',
  styleUrl: './manga-miciomani.component.scss',
})
export class MangaMiciomaniComponent implements OnInit {
  public euService = inject(ElementiUtenteService);
  public router = inject(Router);

  public mangaSongUtilities = new MangaSongUtilities();
  public mmicioLang: MmicioLang = {} as MmicioLang;

  public elem = computed<MangaParodia | null>(() =>
    this.euService.mangaParodia(),
  );

  public pulsanti: PulsantiHeader[] = [
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
