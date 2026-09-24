import { Component, signal } from '@angular/core';
import { boardEmpty } from '../../../../../../../library/functions/confronto.function';
import { checkForWinnerTris } from './functions/tris.function';
import { TrisState, trisRows, trisCols } from './models/tris.model';
import { TrisBotMove } from './functions/tris.bot';

@Component({
  selector: 'app-tris',
  standalone: true,
  imports: [],
  templateUrl: './tris.component.html',
  styleUrl: './tris.component.scss',
})
export class TrisComponent {
  public board = signal<TrisState[][]>(boardEmpty(trisRows, trisCols, null));
  public status = signal<string>('Tua mossa: X');
  public isGameOver = signal<boolean>(false);
  public currentMoves: number = 0;

  public handleCellClick(row: number, col: number): void {
    const currentBoard: TrisState[][] = this.board();

    if (this.isGameOver() || currentBoard[row][col] !== null) {
      return;
    }

    this.currentMoves += 1;
    this.board.update((board: TrisState[][]) => {
      board[row][col] = 'X';
      return board;
    });

    if (this.controlGameOver('X')) return;

    const [randomRow, randomCol] = TrisBotMove(this.board());

    this.currentMoves += 1;
    this.board.update((board: TrisState[][]) => {
      board[randomRow][randomCol] = 'O';
      return board;
    });

    if (!this.controlGameOver('O')) {
      this.status.set('Tua mossa: X');
    }
  }

  private controlGameOver(player: 'X' | 'O'): boolean {
    if (checkForWinnerTris(this.board(), player)) {
      this.status.set(player === 'X' ? 'Hai vinto!' : 'Ha vinto il bot!');
      this.isGameOver.set(true);
      return true;
    }

    if (this.currentMoves >= trisRows * trisCols) {
      this.status.set('Pareggio!');
      this.isGameOver.set(true);
      return true;
    }

    return false;
  }

  public resetBoard(): void {
    this.board.set(boardEmpty(trisRows, trisCols, null));
    this.status.set('Tua mossa: X');
    this.isGameOver.set(false);
    this.currentMoves = 0;
  }
}
