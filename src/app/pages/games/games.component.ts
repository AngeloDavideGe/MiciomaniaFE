import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import {
  getSquadreInGame,
  setPunteggioOttenuto,
  updatePunteggioSquadra,
} from '../../shared/handlers/squadre.handler';
import { Giocatori, Squadre } from '../../shared/interfaces/squadre.interface';
import { User } from '../../shared/interfaces/users.interface';
import { SquadreService } from '../../shared/services/api/squadre.service';
import { games_imports } from './imports/games.import';
import { SquadreGiocatore } from './interfaces/games.interfaces';
import { DeckCardService } from './services/deck-card.service';

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
  public squadre = signal<SquadreGiocatore>({
    personale: [],
    avversario: [],
  });

  public isGames$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/games'),
  );

  ngOnInit(): void {
    this.setPunteggioGiocatore();
    this.deckCardService.setAllCards();
    getSquadreInGame({
      squadreService: this.squadreService,
      nextCall: (data: Squadre[]) => this.nextCallLoadSquadre(data),
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

  private nextCallLoadSquadre(data: Squadre[]): void {
    const user: User | null = DataHttp.user();
    if (user) {
      this.squadre.set({
        personale: data.filter(
          (squadra: Squadre) => squadra.nome == user.iscrizione.squadra,
        ),
        avversario: data.filter(
          (squadra: Squadre) => squadra.nome != user.iscrizione.squadra,
        ),
      });
    }
  }

  private updatePunteggioSquadra($event: BeforeUnloadEvent | null): void {
    const user: User | null = DataHttp.user();
    const punteggio: number = DataHttp.punteggioOttenuto;

    if (user && punteggio != 0) {
      $event ? $event.preventDefault() : null;

      const squadre: string[] = this.squadre().personale.map(
        (squadra: Squadre) => squadra.nome,
      );

      updatePunteggioSquadra({
        squadreService: this.squadreService,
        userId: user.id,
        nomeSquadra: user.iscrizione.squadra || '',
        nextUpdatePunteggio: () => this.nextUpdatePunteggio(squadre, punteggio),
      });
    }
  }

  private nextUpdatePunteggio(squadre: string[], punteggio: number): void {
    const user: User | null = DataHttp.user();

    if (user && user.iscrizione && user.iscrizione.punteggio) {
      user.iscrizione.punteggio += punteggio;
      DataHttp.user.set(user);

      const indexGiocatori: number = this.squadreService
        .classifica()
        .giocatori.findIndex((x: Giocatori) => x.idUtente == user.id);

      if (indexGiocatori > -1) {
        this.squadreService.classifica().giocatori[indexGiocatori].punteggio +=
          punteggio;
      }

      const idSet = new Set<string>(
        squadre.map((id: string) => id.toLowerCase()),
      );

      for (const squadra of this.squadreService.classifica().squadre) {
        if (idSet.has(squadra.nome.toLowerCase())) {
          squadra.punteggio += punteggio;
        }
      }

      setPunteggioOttenuto(0);
    }
  }
}
