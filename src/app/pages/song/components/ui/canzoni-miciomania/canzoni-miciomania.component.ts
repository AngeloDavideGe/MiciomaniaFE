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
