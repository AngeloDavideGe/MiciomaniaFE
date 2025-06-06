import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SquadreCustom } from '../../shared/custom/squadre-custom.class';
import { AuthService } from '../../shared/services/auth.service';
import { DeckCardClass } from './class/deck-card.class';
import { GamesClass } from './class/games.class';
import { SquadreGioco } from './interfaces/games.interfaces';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs';
import { User } from '../../shared/interfaces/users.interface';
import { SquadreService } from '../../shared/services/squadre.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NgIf, NgFor, RouterOutlet],
  templateUrl: './games.component.html',
})
export class GamesComponent extends SquadreCustom implements OnInit, OnDestroy {
  public gamesClass = new GamesClass();
  public deckCardClass = new DeckCardClass();
  public showDetails: boolean = false;
  public squadre: SquadreGioco = {
    personale: [],
    avversario: [],
  } as SquadreGioco;

  public router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.deckCardClass.setAllCards();
    this.loadSquadre({
      ifCall: () => this.ifCallLoadSquadre(),
      elseCall: () => this.elseCallLoadSquadre(),
      nextCall: () => this.nextCallLoadSquadre(),
    });
  }

  ngOnDestroy(): void {
    this.updatePunteggioSquadra(null);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    this.updatePunteggioSquadra($event);
  }

  private ifCallLoadSquadre(): void {
    const user: User | null = this.authService.getUser;
    if (user) {
      environment.team.forEach((nomeTeam) => {
        if (user.iscrizione.team?.includes(nomeTeam)) {
          this.squadre.personale.push({
            nome: nomeTeam,
            punteggio: 'caricamento...',
          });
        } else {
          this.squadre.avversario.push({
            nome: nomeTeam,
            punteggio: 'caricamento...',
          });
        }
      });
    }
  }

  private elseCallLoadSquadre(): void {
    const user: User | null = this.authService.getUser;
    if (user) {
      environment.team.forEach((nomeTeam) => {
        const punteggioFind: number | undefined =
          this.squadreService.squadre.find(
            (squadra) => squadra.id == nomeTeam
          )?.punteggio;

        if (user.iscrizione.team?.includes(nomeTeam)) {
          this.squadre.personale.push({
            nome: nomeTeam,
            punteggio: punteggioFind || 'non disponibile',
          });
        } else {
          this.squadre.avversario.push({
            nome: nomeTeam,
            punteggio: punteggioFind || 'non disponibile',
          });
        }
      });
    }
  }

  private nextCallLoadSquadre(): void {
    this.squadre.personale.forEach((squadra) => {
      const punteggioFind: number | undefined =
        this.squadreService.squadre.find(
          (squadraFind) => squadraFind.id == squadra.nome
        )?.punteggio;
      squadra.punteggio = punteggioFind || 'non disponibile';
    });

    this.squadre.avversario.forEach((squadra) => {
      const punteggioFind: number | undefined =
        this.squadreService.squadre.find(
          (squadraFind) => squadraFind.id == squadra.nome
        )?.punteggio;
      squadra.punteggio = punteggioFind || 'non disponibile';
    });
  }

  private updatePunteggioSquadra($event: BeforeUnloadEvent | null): void {
    const user: User | null = this.authService.getUser;
    const ss: SquadreService = this.squadreService;

    if (user && ss.getPunteggioOttenuto > 0) {
      $event ? $event.preventDefault() : null;
      const squadre: string[] = ss.squadre.map((squadra) => squadra.id);
      ss.updatePunteggioSquadra(user.id, squadre)
        .pipe(take(1))
        .subscribe({
          next: () => (ss.setPunteggioOttenuto = 0),
        });
    }
  }
}
