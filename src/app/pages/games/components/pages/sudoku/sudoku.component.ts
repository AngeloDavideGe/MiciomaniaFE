import { Component, OnInit } from '@angular/core';
import { SudokuCell, SudokuNumber } from '../../../interfaces/games.interfaces';
import { shuffleArray } from '../../../functions/deck-card.function';
import { DettagliGameComponent } from '../../../shared/components/dettagli-game.component';

@Component({
  selector: 'app-sudoku',
  imports: [DettagliGameComponent],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss',
})
export class SudokuComponent implements OnInit {
  public sudokuBoard: SudokuCell[][] = [];

  ngOnInit(): void {
    this.sudokuBoard = this.generateCompleteSudoku();
  }

  private generateCompleteSudoku(): SudokuCell[][] {
    const board: SudokuCell[][] = this.sudokuBoardEmpty();

    const fillCell: Function = (r: number, c: number): boolean => {
      if (r === 9) return true;

      const nextR: number = c === 8 ? r + 1 : r;
      const nextC: number = c === 8 ? 0 : c + 1;

      if (board[r][c].value !== null) {
        return fillCell(nextR, nextC);
      }

      const numbers: SudokuNumber[] = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      for (const n of numbers) {
        if (this.isValidMove(board, r, c, n)) {
          board[r][c].value = n;
          if (fillCell(nextR, nextC)) return true;
          board[r][c].value = null;
        }
      }

      return false;
    };

    fillCell(0, 0);
    return board;
  }

  private sudokuBoardEmpty(): SudokuCell[][] {
    const sudokuBoard: SudokuCell[][] = [];

    for (let i = 0; i < 9; i++) {
      const row: SudokuCell[] = [];
      for (let j = 0; j < 9; j++) {
        row.push({ value: null, isVisible: false });
      }
      sudokuBoard.push(row);
    }

    return sudokuBoard;
  }

  private isValidMove(
    board: SudokuCell[][],
    row: number,
    col: number,
    num: SudokuNumber
  ): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i].value === num) return false;
    }

    for (let i = 0; i < 9; i++) {
      if (board[i][col].value === num) return false;
    }

    const boxRowStart: number = Math.floor(row / 3) * 3;
    const boxColStart: number = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRowStart + i][boxColStart + j].value === num) return false;
      }
    }

    return true;
  }

  inserisciNumero($event: Event, cell: SudokuCell) {
    const inputElement = $event.target as HTMLInputElement;
    let value: number = parseInt(inputElement.value, 10);

    if (isNaN(value) || value < 1 || value > 9) {
      inputElement.value = '';
      return;
    }

    if (value == cell.value) {
      cell.isVisible = true;
    } else {
      inputElement.value = '';
      alert('Mossa non valida!');
    }
  }
}
