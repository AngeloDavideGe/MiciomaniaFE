import { Component } from '@angular/core';
import { EsitoGame, TrisCell } from '../../interfaces/games.interfaces';
import { GamesBase } from '../../shared/base/games.base';
import { DettagliGameComponent } from '../../shared/components/dettagli-game.component';

@Component({
  selector: 'app-tris',
  standalone: true,
  imports: [DettagliGameComponent],
  templateUrl: './tris.component.html',
})
export class TrisComponent extends GamesBase {
  public tabella: TrisCell[][] = [
    [{} as TrisCell, {} as TrisCell, {} as TrisCell],
    [{} as TrisCell, {} as TrisCell, {} as TrisCell],
    [{} as TrisCell, {} as TrisCell, {} as TrisCell],
  ];

  playerSelect(i: number, j: number): void {
    if (!this.cellaOccupata(i, j)) {
      this.tabella[i][j].player = true;
      if (this.controllaTris('player')) {
        this.squadreService.setPunteggioOttenuto = 1;
        this.finePartita('vittoria');
      } else {
        this.turnoDelBot();
      }
    }
  }

  private turnoDelBot(): void {
    const celleLibere: { i: number; j: number }[] = [];

    this.forAllCell((i, j) => {
      if (!this.cellaOccupata(i, j)) {
        celleLibere.push({ i, j });
      }
    });

    if (celleLibere.length > 0) {
      this.botSelect(celleLibere);
    } else {
      this.squadreService.setPunteggioOttenuto = -2;
      this.finePartita('pareggio');
    }
  }

  private botSelect(celleLibere: { i: number; j: number }[]): void {
    const randomIndex = Math.floor(Math.random() * celleLibere.length);
    const { i, j } = celleLibere[randomIndex];
    this.tabella[i][j].bot = true;
    if (this.controllaTris('bot')) {
      this.squadreService.setPunteggioOttenuto = -4;
      this.finePartita('sconfitta');
    }
  }

  private cellaOccupata(i: number, j: number): boolean {
    return this.tabella[i][j].player || this.tabella[i][j].bot;
  }

  private finePartita(esito: EsitoGame): void {
    this.alertGameService.alert(esito);
    this.inizializzaTabella();
  }

  private forAllCell(cellFunc: (i: number, j: number) => void): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cellFunc(i, j);
      }
    }
  }

  private inizializzaTabella(): void {
    this.forAllCell((i, j) => {
      this.tabella[i][j] = {
        player: false,
        bot: false,
      };
    });
  }

  private controllaTris(key: keyof TrisCell): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        this.tabella[i][0][key] &&
        this.tabella[i][1][key] &&
        this.tabella[i][2][key]
      ) {
        return true;
      }
      if (
        this.tabella[0][i][key] &&
        this.tabella[1][i][key] &&
        this.tabella[2][i][key]
      ) {
        return true;
      }
    }

    if (
      this.tabella[0][0][key] &&
      this.tabella[1][1][key] &&
      this.tabella[2][2][key]
    ) {
      return true;
    }

    if (
      this.tabella[0][2][key] &&
      this.tabella[1][1][key] &&
      this.tabella[2][0][key]
    ) {
      return true;
    }

    return false;
  }
}
