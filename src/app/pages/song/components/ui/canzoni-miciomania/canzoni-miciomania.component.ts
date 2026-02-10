import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { take } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import {
  CanzoniParodia,
  MangaSong,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import {
  FiltriInterface,
  GetFiltriCustom,
} from '../../../../../shared/utilities/pagination.utilities';
import { canzoniMiciomania_imports } from './imports/canzoni-miciomania.import';

@Component({
  selector: 'app-canzoni-miciomania',
  imports: canzoniMiciomania_imports,
  templateUrl: './canzoni-miciomania.component.html',
})
export class CanzoniMiciomaniaComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private euService = inject(ElementiUtenteService);

  public readonly defaultPic: string = environment.defaultPicsUrl.song;
  public readonly canzoniForPage: number = 2;
  public filtriMiciomania: FiltriInterface<MangaSong> = {} as any;
  public filtriUtente: FiltriInterface<MangaSong> = {} as any;

  public currentPageMiciomania = signal<number>(1);
  public currentPageUtente = signal<number>(1);

  public canzoniMiciomania = computed<MangaSong[]>(() => {
    const canzoni: CanzoniParodia | null = this.euService.canzoniParodia();
    return canzoni ? canzoni.canzoniMiciomania : [];
  });

  public canzoniUtente = computed<MangaSong[]>(() => {
    const canzoni: CanzoniParodia | null = this.euService.canzoniParodia();
    return canzoni ? canzoni.canzoniUtente : [];
  });

  constructor() {
    effect(() => {
      this.filtriMiciomania = GetFiltriCustom<MangaSong, null>({
        elemTable: this.canzoniMiciomania,
        elemForPage: this.canzoniForPage,
        currentPage: this.currentPageMiciomania,
      });
    });

    effect(() => {
      this.filtriUtente = GetFiltriCustom<MangaSong, null>({
        elemTable: this.canzoniUtente,
        elemForPage: this.canzoniForPage,
        currentPage: this.currentPageUtente,
      });
    });
  }

  ngOnInit(): void {
    if (!this.euService.caricamentoCanzoni) {
      this.euService.caricamentoCanzoni = true;
      this.euService
        .getListaCanzoniMiciomani()
        .pipe(take(1))
        .subscribe({
          next: (data: CanzoniParodia) =>
            this.euService.canzoniParodia.set(data),
          error: (error) => {
            this.euService.caricamentoCanzoni = false;
            console.error('Errore nel recupero della lista dei manga', error);
          },
        });
    }
  }
}
