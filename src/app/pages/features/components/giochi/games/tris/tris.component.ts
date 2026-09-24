import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { boardEmpty } from '../../../../../../../library/functions/confronto.function';

type TrisState = 'X' | 'O' | null;

@Component({
  selector: 'app-tris',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tris-container">
      <h2>Tris</h2>

      <p class="status">{{ status() }}</p>

      <div class="board" role="grid" aria-label="Scacchiera del tris">
        <ng-container *ngFor="let row of board(); let rowIndex = index">
          <button
            *ngFor="let cell of row; let colIndex = index"
            type="button"
            class="cell"
            [attr.aria-label]="
              'Cella ' + (rowIndex + 1) + ', colonna ' + (colIndex + 1)
            "
            [disabled]="!canPlayCell(rowIndex, colIndex)"
            (click)="handleCellClick(rowIndex, colIndex)"
          >
            {{ cell || '' }}
          </button>
        </ng-container>
      </div>

      <button type="button" class="reset-button" (click)="resetBoard()">
        Reset
      </button>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      color: #1f2937;
    }

    .tris-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.75rem;
    }

    .status {
      margin: 0;
      font-weight: 600;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(3, minmax(72px, 90px));
      gap: 0.5rem;
    }

    .cell {
      width: 100%;
      aspect-ratio: 1;
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      background: #fff;
      font-size: 2rem;
      font-weight: 700;
      cursor: pointer;
      transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;
    }

    .cell:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    .cell:disabled {
      cursor: default;
    }

    .reset-button {
      border: none;
      border-radius: 999px;
      background: #2563eb;
      color: #fff;
      padding: 0.7rem 1.25rem;
      font-weight: 600;
      cursor: pointer;
    }
  `,
})
export class TrisComponent {
  public board = signal<TrisState[][]>(boardEmpty(3, 3, null));
  public status = signal('Tua mossa: X');
  public isGameOver = signal(false);

  public canPlayCell(row: number, col: number): boolean {
    return !this.isGameOver() && this.board()[row][col] === null;
  }

  public handleCellClick(row: number, col: number): void {
    const currentBoard = this.board();

    if (this.isGameOver() || currentBoard[row][col] !== null) {
      return;
    }

    const nextBoard = currentBoard.map((boardRow) => [...boardRow]);
    nextBoard[row][col] = 'X';
    this.board.set(nextBoard);

    if (this.checkForWinner(nextBoard, 'X')) {
      this.status.set('Hai vinto!');
      this.isGameOver.set(true);
      return;
    }

    if (this.isBoardFull(nextBoard)) {
      this.status.set('Pareggio!');
      this.isGameOver.set(true);
      return;
    }

    this.botMove();
  }

  public resetBoard(): void {
    this.board.set(boardEmpty(3, 3, null));
    this.status.set('Tua mossa: X');
    this.isGameOver.set(false);
  }

  private botMove(): void {
    const currentBoard = this.board();
    const availableCells: Array<[number, number]> = [];

    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === null) {
          availableCells.push([rowIndex, colIndex]);
        }
      });
    });

    if (availableCells.length === 0) {
      this.status.set('Pareggio!');
      return;
    }

    const [randomRow, randomCol] =
      availableCells[Math.floor(Math.random() * availableCells.length)];
    const nextBoard = currentBoard.map((row) => [...row]);
    nextBoard[randomRow][randomCol] = 'O';
    this.board.set(nextBoard);

    if (this.checkForWinner(nextBoard, 'O')) {
      this.status.set('Ha vinto il bot!');
      this.isGameOver.set(true);
      return;
    }

    if (this.isBoardFull(nextBoard)) {
      this.status.set('Pareggio!');
      this.isGameOver.set(true);
      return;
    }

    this.status.set('Tua mossa: X');
  }

  private checkForWinner(board: TrisState[][], player: 'X' | 'O'): boolean {
    const winningLines = [
      [0, 0, 0, 1, 0, 2],
      [1, 0, 1, 1, 1, 2],
      [2, 0, 2, 1, 2, 2],
      [0, 0, 1, 0, 2, 0],
      [0, 1, 1, 1, 2, 1],
      [0, 2, 1, 2, 2, 2],
      [0, 0, 1, 1, 2, 2],
      [0, 2, 1, 1, 2, 0],
    ];

    for (let i = 0; i < winningLines.length; i += 1) {
      const [aRow, aCol, bRow, bCol, cRow, cCol] = winningLines[i];
      if (
        board[aRow][aCol] === player &&
        board[bRow][bCol] === player &&
        board[cRow][cCol] === player
      ) {
        return true;
      }
    }

    return false;
  }

  private isBoardFull(board: TrisState[][]): boolean {
    return board.every((row) => row.every((cell) => cell !== null));
  }
}
