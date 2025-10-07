import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  loadSquadre,
  setPunteggioOttenuto,
  updatePunteggioSquadra,
} from '../../shared/handlers/squadre.handler';
import { User } from '../../shared/interfaces/users.interface';
import { games_imports } from './imports/games.import';
import { SquadraGioco, SquadreGiocatore } from './interfaces/games.interfaces';
import { DeckCardService } from './services/deck-card.service';
import { DataHttp } from '../../core/api/http.data';
import { SquadreService } from '../../shared/services/api/squadre.service';
import { Squadre, TopUser } from '../../shared/interfaces/squadre.interface';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: games_imports,
  templateUrl: './games.component.html',
})
export class GamesComponent implements OnInit, OnDestroy {
  public squadreService = inject(SquadreService);
  private deckCardService = inject(DeckCardService);
  public router = inject(Router);

  public showDetails: boolean = false;
  public punteggioPersonale: number = 0;
  public squadre: SquadreGiocatore = {
    personale: [],
    avversario: [],
  } as SquadreGiocatore;

  public isGames$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/games')
  );

  ngOnInit(): void {
    this.setPunteggioGiocatore();
    this.deckCardService.setAllCards();
    loadSquadre({
      squadreService: this.squadreService,
      ifCall: () => this.ifCallLoadSquadre(),
      elseCall: () => this.elseCallLoadSquadre(),
      nextCall: () => this.nextCallLoadSquadre(),
      errorCall: () => {},
      finalizeFunc: () => {},
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
    const user: User | null = DataHttp.user();
    if (user) {
      this.punteggioPersonale = user.iscrizione.punteggio || 0;
    }
  }

  private ifCallLoadSquadre(): void {
    const user: User | null = DataHttp.user();
    if (user) {
      environment.team.forEach((nomeTeam: string) => {
        if (user.iscrizione.squadra?.includes(nomeTeam)) {
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
    const user: User | null = DataHttp.user();
    if (user) {
      environment.team.forEach((nomeTeam: string) => {
        const punteggioFind: number | undefined =
          this.squadreService.classifica.squadre.find(
            (squadra: Squadre) => squadra.id == nomeTeam
          )?.punteggio;

        if (user.iscrizione.squadra?.includes(nomeTeam)) {
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
    const user: User | null = DataHttp.user();
    if (user) {
      this.squadre.personale.forEach((squadra: SquadraGioco) => {
        const punteggioFind: number | undefined =
          this.squadreService.classifica.squadre.find(
            (squadraFind: Squadre) => squadraFind.id == squadra.nome
          )?.punteggio;
        squadra.punteggio = punteggioFind || 'non disponibile';
      });

      this.squadre.avversario.forEach((squadra: SquadraGioco) => {
        const punteggioFind: number | undefined =
          this.squadreService.classifica.squadre.find(
            (squadraFind: Squadre) => squadraFind.id == squadra.nome
          )?.punteggio;
        squadra.punteggio = punteggioFind || 'non disponibile';
      });
    }
  }

  private updatePunteggioSquadra($event: BeforeUnloadEvent | null): void {
    const user: User | null = DataHttp.user();
    const punteggio: number = DataHttp.punteggioOttenuto;

    if (user && punteggio != 0) {
      $event ? $event.preventDefault() : null;
      const squadre: string[] = this.squadre.personale.map(
        (squadra: SquadraGioco) => squadra.nome
      );
      updatePunteggioSquadra({
        squadreService: this.squadreService,
        userId: user.id,
        nomeSquadra: squadre,
        nextUpdatePunteggio: () => this.nextUpdatePunteggio(squadre, punteggio),
      });
    }
  }

  private nextUpdatePunteggio(squadre: string[], punteggio: number): void {
    const user: User | null = DataHttp.user();

    if (user && user.iscrizione && user.iscrizione.punteggio) {
      user.iscrizione.punteggio += punteggio;
      DataHttp.user.set(user);

      const indexTopUser: number =
        this.squadreService.classifica.topUser.findIndex(
          (x: TopUser) => x.id == user.id
        );

      if (indexTopUser > -1) {
        this.squadreService.classifica.topUser[indexTopUser].punteggio +=
          punteggio;
      }
    }

    const idSet = new Set<string>(
      squadre.map((id: string) => id.toLowerCase())
    );

    for (const squadra of this.squadreService.classifica.squadre) {
      if (idSet.has(squadra.id.toLowerCase())) {
        squadra.punteggio += punteggio;
      }
    }

    setPunteggioOttenuto(0);
  }
}
