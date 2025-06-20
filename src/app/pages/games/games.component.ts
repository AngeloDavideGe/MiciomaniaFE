import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, startWith, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SquadreClass } from '../../shared/class/squadre.class';
import { User } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/auth.service';
import { DeckCardClass } from './class/deck-card.class';
import { GamesClass } from './class/games.class';
import { SquadreGiocatore } from './interfaces/games.interfaces';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NgIf, NgFor, RouterOutlet, AsyncPipe],
  templateUrl: './games.component.html',
})
export class GamesComponent implements OnInit, OnDestroy {
  public sc = new SquadreClass();
  public gamesClass = new GamesClass();
  public deckCardClass = new DeckCardClass();
  public showDetails: boolean = false;
  public punteggioPersonale: number = 0;
  public squadre: SquadreGiocatore = {
    personale: [],
    avversario: [],
  } as SquadreGiocatore;

  public router = inject(Router);
  private authService = inject(AuthService);

  public isGames$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url } as NavigationEnd),
    map((event) => event.url == '/games')
  );

  ngOnInit(): void {
    this.setPunteggioGiocatore();
    this.deckCardClass.setAllCards();
    this.sc.loadSquadre({
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

  private setPunteggioGiocatore(): void {
    const user: User | null = this.authService.getUser;
    if (user) {
      this.punteggioPersonale = user.iscrizione.punteggio || 0;
    }
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
          this.sc.squadreService.squadre.find(
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
    const user: User | null = this.authService.getUser;
    if (user) {
      this.squadre.personale.forEach((squadra) => {
        const punteggioFind: number | undefined =
          this.sc.squadreService.squadre.find(
            (squadraFind) => squadraFind.id == squadra.nome
          )?.punteggio;
        squadra.punteggio = punteggioFind || 'non disponibile';
      });

      this.squadre.avversario.forEach((squadra) => {
        const punteggioFind: number | undefined =
          this.sc.squadreService.squadre.find(
            (squadraFind) => squadraFind.id == squadra.nome
          )?.punteggio;
        squadra.punteggio = punteggioFind || 'non disponibile';
      });
    }
  }

  private updatePunteggioSquadra($event: BeforeUnloadEvent | null): void {
    const user: User | null = this.authService.getUser;
    const punteggio: number = this.sc.squadreService.getPunteggioOttenuto;

    if (user && punteggio != 0) {
      $event ? $event.preventDefault() : null;
      const squadre: string[] = this.squadre.personale.map(
        (squadra) => squadra.nome
      );
      this.sc.squadreService
        .updatePunteggioSquadra(user.id, squadre)
        .pipe(take(1))
        .subscribe({
          next: () => this.nextUpdatePunteggio(squadre, punteggio),
        });
    }
  }

  private nextUpdatePunteggio(squadre: string[], punteggio: number): void {
    const user: User | null = this.authService.getUser;

    if (user && user.iscrizione && user.iscrizione.punteggio) {
      user.iscrizione.punteggio += punteggio;
      localStorage.setItem('user', JSON.stringify(user));
      this.authService.userSubject.next(user);
    }

    const idSet = new Set(squadre.map((id) => id.toLowerCase()));

    for (const squadra of this.sc.squadreService.squadre) {
      if (idSet.has(squadra.id.toLowerCase())) {
        squadra.punteggio += punteggio;
      }
    }

    this.sc.squadreService.setPunteggioOttenuto = 0;
  }
}
