import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { iCard } from '../../../../../../library/interfaces/card.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import {
  CanzoniParodia,
  MangaSong,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/class/mangaSong.utilities';
import { canzoniMiciomania_imports } from './canzoni-miciomania.import';
import { SezioneScroll } from '../../../../../../library/interfaces/scroll.interface';

@Component({
  selector: 'app-canzoni-miciomania',
  imports: canzoniMiciomania_imports,
  templateUrl: './canzoni-miciomania.component.html',
})
export class CanzoniMiciomaniaComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private euService = inject(ElementiUtenteService);
  private appConfig = inject(AppConfigService);

  public currentButtonSong = signal<string | null>(null);

  public readonly defaultPic: string =
    this.appConfig.config.defaultPicsUrl.song;

  public sezioni = computed<SezioneScroll[]>(() => {
    const canzoniParodia: CanzoniParodia | null =
      this.euService.canzoniParodia();

    if (canzoniParodia) {
      return this.getSezioni(canzoniParodia);
    } else {
      return [];
    }
  });

  public canzoniMiciomania = computed<iCard[]>(() => {
    const canzoni: CanzoniParodia | null = this.euService.canzoniParodia();

    if (canzoni) {
      return canzoni.canzoniMiciomania.map((x: MangaSong) => {
        return {
          titolo: x.nome,
          urlPic: x.copertina || this.defaultPic,
          azione: () => this.msu.playSong(x, canzoni.canzoniMiciomania),
          descrizione: `Genere: <strong>${x.genere}</strong
            ><br />
            Autore: <em>${x.idUtente}</em>`,
          bottone: 'si',
        } as iCard;
      });
    }

    return [];
  });

  public canzoniUtente = computed<iCard[]>(() => {
    const canzoni: CanzoniParodia | null = this.euService.canzoniParodia();

    if (canzoni) {
      return canzoni.canzoniUtente.map((x: MangaSong) => {
        return {
          titolo: x.nome,
          urlPic: x.copertina || this.defaultPic,
          azione: () => this.msu.playSong(x, canzoni.canzoniUtente),
          descrizione: `Genere: <strong>${x.genere}</strong
            ><br />
            Autore: <em>${x.idUtente}</em>`,
          bottone: 'si',
        } as iCard;
      });
    }

    return [];
  });

  constructor() {
    effect(() => {
      const song: MangaSong | null = this.msu.sc.currentCanzone();

      if (song && song.nome) {
        this.currentButtonSong.set(song.nome);
      } else {
        this.currentButtonSong.set(null);
      }
    });
  }

  ngOnInit(): void {
    handlerFunc<CanzoniParodia>({
      skipCall: this.euService.canzoniLoaded,
      callHttp: () => this.euService.getListaCanzoniMiciomani(),
      nextCall: (data: CanzoniParodia) =>
        this.euService.canzoniParodia.set(data),
      errorCall: () => (this.euService.canzoniLoaded = false),
    });

    this.euService.canzoniLoaded = true;
  }

  private getSezioni(canzoni: CanzoniParodia): SezioneScroll[] {
    return [
      {
        id: 'CanzoniMiciomania',
        titolo: 'Canzoni Miciomania',
        lunghezza: canzoni.canzoniMiciomania.length,
        icona: 'bi bi-arrow-down',
        nomeIcona: 'Vai a canzoni Utente',
      },
      {
        id: 'CazoniUtente',
        titolo: 'Cazoni Utente',
        lunghezza: canzoni.canzoniUtente.length,
        icona: 'bi bi-arrow-up',
        nomeIcona: 'Vai a canzoni Miciomania',
      },
    ];
  }
}
