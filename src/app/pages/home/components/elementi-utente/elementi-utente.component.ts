import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ElementiUtenteService } from '../../../../shared/services/elementiUtente.service';
import { ElementiUtenteUtilities } from '../../../../shared/utilities/elementiUtente-utilities.class';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  CanzoniMiciomania,
  MangaMiciomania,
  Proposta,
} from '../../../../shared/interfaces/elementiUtente.interface';
import { take } from 'rxjs';
import { MangaSongUtilities } from '../../../../shared/utilities/mangaSong-utilities';
import { CreaPropostaComponent } from './components/crea-proposta/crea-proposta.component';
import { MangaMiciomaniaCardComponent } from './components/manga-miciomania-card/manga-miciomania-card.component';
import { CanzoniMiciomaniaCardComponent } from './components/canzoni-miciomania-card/canzoni-miciomania-card.component';

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

  private elementiUtenteUtilities = new ElementiUtenteUtilities();
  public mangaSongUtilities = new MangaSongUtilities();

  public elementiUtenteService = inject(ElementiUtenteService);
  private authService = inject(AuthService);
  public router = inject(Router);

  ngOnInit(): void {
    const user = this.authService.getUser;

    if (user) {
      this.userId = user.id;
      this.elementiUtenteUtilities
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
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.mangaSongUtilities.stopSong();
  }
}
