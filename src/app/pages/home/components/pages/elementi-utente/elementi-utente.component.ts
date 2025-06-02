import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ElementiUtenteUtilities } from '../../../../../shared/utilities/elementiUtente-utilities.class';
import { take } from 'rxjs';
import {
  CanzoniMiciomania,
  MangaMiciomania,
  Proposta,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong-utilities';
import { CanzoniMiciomaniaCardComponent } from './components/canzoni-miciomania-card/canzoni-miciomania-card.component';
import { CreaPropostaComponent } from './components/crea-proposta/crea-proposta.component';
import { MangaMiciomaniaCardComponent } from './components/manga-miciomania-card/manga-miciomania-card.component';

@Component({
  selector: 'app-elementi-utente',
  standalone: true,
  imports: [
    NgIf,
    CreaPropostaComponent,
    MangaMiciomaniaCardComponent,
    CanzoniMiciomaniaCardComponent,
  ],
  templateUrl: './elementi-utente.component.html',
  styles: ``,
})
export class ElementiUtenteComponent implements OnInit, OnDestroy {
  public manga: MangaMiciomania = {} as MangaMiciomania;
  public canzone: CanzoniMiciomania = {} as CanzoniMiciomania;
  public proposta: Proposta = {} as Proposta;
  public creaProposta: boolean = false;
  public creaPropostaControllo: boolean = false;
  public userId: string = '';
  public tornaAllaHome: Function = () => this.router.navigate(['/home']);

  public elemUti = new ElementiUtenteUtilities();
  public mangaSongUtilities = new MangaSongUtilities();

  private authService = inject(AuthService);
  public router = inject(Router);

  ngOnInit(): void {
    this.loadElementiUtente();
    this.controlloProposta();
  }

  private loadElementiUtente(): void {
    const user = this.authService.getUser;

    if (user) {
      this.userId = user.id;
      this.elemUti
        .getElementiUtente(user.id, true)
        .pipe(take(1))
        .subscribe({
          next: (elementiUtente) => {
            this.manga = elementiUtente.manga;
            this.canzone = elementiUtente.canzone;
            this.proposta = elementiUtente.proposta;
            this.creaPropostaControllo =
              this.manga.nome == '' || this.canzone.nome == '';
          },
          error: (error) => {
            console.error('Errore nel recupero degli elementi utente:', error);
          },
        });
    }
  }

  private controlloProposta(): void {
    if (!this.elemUti.elementiUtenteService.propostaCaricata) {
      this.router.navigate(['/home']);
      alert('La proposta sta in caricamento, attendere un attimo');
    }
  }

  ngOnDestroy(): void {
    this.mangaSongUtilities.stopSong();
  }
}
