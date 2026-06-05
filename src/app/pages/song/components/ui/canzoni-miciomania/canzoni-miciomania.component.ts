import { Component, computed, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { iCard } from '../../../../../../library/interfaces/card.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import {
  CanzoniParodia,
  MangaSong,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/class/mangaSong.utilities';
import { canzoniMiciomania_imports } from './imports/canzoni-miciomania.import';
import { handlerFunc } from '../../../../../../library/functions/handler.function';

@Component({
  selector: 'app-canzoni-miciomania',
  imports: canzoniMiciomania_imports,
  templateUrl: './canzoni-miciomania.component.html',
})
export class CanzoniMiciomaniaComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private euService = inject(ElementiUtenteService);
  private appConfig = inject(AppConfigService);

  public readonly defaultPic: string =
    this.appConfig.config.defaultPicsUrl.song;

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
}
