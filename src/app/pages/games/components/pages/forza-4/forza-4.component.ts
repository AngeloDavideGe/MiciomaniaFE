import { Component } from '@angular/core';
import { setPunteggioOttenuto } from '../../../../../shared/handlers/squadre.handler';
import { forza4CellEmpty } from '../../../constants/boardEmpty.const';
import { boardEmpty } from '../../../functions/games.function';
import { EsitoGame, Forza4, Turno } from '../../../interfaces/games.interfaces';
import { GamesBase } from '../../shared/base/games.base';
import { DettagliGameComponent } from '../../shared/components/dettagli-game.component';
import { Forza4BotClass } from './bot/forza-4.bot';

@Component({
  selector: 'app-forza-4',
  standalone: true,
  imports: [DettagliGameComponent],
  templateUrl: './forza-4.component.html',
})
export class Forza4Component extends GamesBase {
  public readonly dimCampo: number = 6;
  public gameOver: boolean = false;
  private bot = new Forza4BotClass();
  private turno: Turno = 'Player';
  public campo: Forza4[][] = boardEmpty<Forza4>(this.dimCampo, forza4CellEmpty);

  inserisciPedina(j: number): void {
    if (this.turno == 'Player') {
      this.turno = 'Bot';
      const rigaLibera: number | undefined = this.rigaLibera(j);

      if (rigaLibera || rigaLibera == 0) {
        this.campo[rigaLibera][j].player = true;
        this.gameOver = this.controllaVittoria('player');

        if (this.gameOver) {
          this.resetGame(2, 'vittoria');
        } else {
          setTimeout(() => this.turnoBot(), 350);
        }
      }
    }
  }

  turnoBot(): void {
    let j: number = this.bot.getColonnaSelezionata(this.campo);

    if (j > -1) {
      const rigaLibera: number | undefined = this.rigaLibera(j);

      if (rigaLibera || rigaLibera == 0) {
        this.campo[rigaLibera][j].bot = true;
        this.gameOver = this.controllaVittoria('bot');

        if (this.gameOver) {
          this.resetGame(-3, 'sconfitta');
        } else {
          this.turno = 'Player';
        }
      }
    }
  }

  private rigaLibera(j: number): number | undefined {
    const righe: number[] = Array.from({ length: this.dimCampo }, (_, i) => i); // [0, 1, 2, 3, 4, 5]

    const rigaLibera: number | undefined = righe
      .reverse()
      .find((i) => !this.campo[i][j].player && !this.campo[i][j].bot);

    return rigaLibera;
  }

  public controllaVittoria(key: keyof Forza4): boolean {
    const directions = [
      [0, 1], // orizzontale
      [1, 0], // verticale
      [1, 1], // diagonale ↘
      [1, -1], // diagonale ↙
    ];

    for (let i = 0; i < this.campo.length; i++) {
      for (let j = 0; j < this.campo[0].length; j++) {
        if (this.campo[i][j][key]) {
          for (const [di, dj] of directions) {
            let count = 1;
            for (let k = 1; k < 4; k++) {
              const ni: number = i + di * k;
              const nj: number = j + dj * k;
              if (
                ni >= 0 &&
                ni < this.campo.length &&
                nj >= 0 &&
                nj < this.campo[0].length &&
                this.campo[ni][nj][key]
              ) {
                count++;
              } else {
                break;
              }
            }
            if (count === 4) return true;
          }
        }
      }
    }
    return false;
  }

  private resetGame(p: number, e: EsitoGame): void {
    this.gameOver = false;
    this.turno = 'Player';
    this.alertGameService.alert(e);
    setPunteggioOttenuto(p);
    this.campo = boardEmpty<Forza4>(this.dimCampo, forza4CellEmpty);
  }
}
