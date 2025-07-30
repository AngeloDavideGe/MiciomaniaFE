import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
  Proposta,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { ElementiUtenteUtilities } from '../../../../../shared/utilities/elementiUtente.utilities';
import { elementi_utente_imports } from './imports/elementi-utente.imports';
import { DataHttp } from '../../../../../core/api/http.data';

@Component({
  selector: 'app-elementi-utente',
  standalone: true,
  imports: elementi_utente_imports,
  templateUrl: './elementi-utente.component.html',
})
export class ElementiUtenteComponent implements OnInit {
  public eu: ElementiUtente = {
    manga: {} as MangaMiciomania,
    canzone: {} as CanzoniMiciomania,
    proposta: {} as Proposta,
  };
  public creaProposta = {
    componente: false,
    controllo: false,
    punteggio: false,
  };
  public userId: string = '';
  public userPunteggio: number = 0;
  public punteggioNecessario: number = 10;
  public tornaAllaHome: Function = () => this.router.navigate(['/home']);
  public elemUti = new ElementiUtenteUtilities();

  public router = inject(Router);

  ngOnInit(): void {
    this.loadElementiUtente();
    this.controlloProposta();
  }

  private loadElementiUtente(): void {
    const user: User | null = DataHttp.user();

    if (user) {
      this.userId = user.id;
      this.userPunteggio = user.iscrizione.punteggio || 0;
      this.elemUti
        .getElementiUtente(user.id, true)
        .pipe(take(1))
        .subscribe({
          next: (elementiUtente) => {
            this.eu = {
              manga: elementiUtente.manga,
              canzone: elementiUtente.canzone,
              proposta: elementiUtente.proposta,
            };
            this.creaProposta = {
              componente: false,
              controllo: this.eu.manga.nome == '' || this.eu.canzone.nome == '',
              punteggio: this.userPunteggio > this.punteggioNecessario,
            };
          },
          error: (error) =>
            console.error('Errore nel recupero degli elementi utente:', error),
        });
    }
  }

  private controlloProposta(): void {
    if (!this.elemUti.elementiUtenteService.propostaCaricata) {
      this.router.navigate(['/home']);
      alert('La proposta sta in caricamento, attendere un attimo');
    }
  }
}
