import { Component, inject, OnInit } from '@angular/core';
import {
  EsitoGame,
  SudokuCell,
  SudokuNumber,
} from '../../../interfaces/games.interfaces';
import { shuffleArray } from '../../../functions/deck-card.function';
import { DettagliGameComponent } from '../../../shared/components/dettagli-game.component';
import { boardEmpty } from '../../../functions/games.function';
import { sudokuCellEmpty } from '../../../constants/boardEmpty.const';
import { setPunteggioOttenuto } from '../../../../../shared/handlers/squadre.handler';
import { AlertGamesService } from '../../../services/alert-games.service';

@Component({
  selector: 'app-sudoku',
  imports: [DettagliGameComponent],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss',
})
export class SudokuComponent implements OnInit {
  private alertService = inject(AlertGamesService);

  public sudokuBoard: SudokuCell[][] = [];
  private celleCorrette: number = 0;
  private readonly visibleCells: number = 50;

  ngOnInit(): void {
    this.sudokuBoard = this.generateCompleteSudoku();
  }

  private generateCompleteSudoku(): SudokuCell[][] {
    const board: SudokuCell[][] = boardEmpty<SudokuCell>(9, sudokuCellEmpty);
    let visibleCount: number = 0;
    let celleRimasteDaVedere: number = 81;

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
          const celleMancanti: number = this.visibleCells - visibleCount;

          if (
            visibleCount < this.visibleCells &&
            (Math.random() < 0.65 || celleRimasteDaVedere === celleMancanti)
          ) {
            board[r][c].isVisible = true;
            visibleCount++;
          }

          celleRimasteDaVedere--;

          if (fillCell(nextR, nextC)) return true;

          if (board[r][c].isVisible) {
            visibleCount--;
            board[r][c].isVisible = false;
          }
          board[r][c].value = null;
          celleRimasteDaVedere++;
        }
      }

      return false;
    };

    fillCell(0, 0);

    this.celleCorrette = visibleCount;
    return board;
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

  inserisciNumero($event: Event, cell: SudokuCell): void {
    const inputElement = $event.target as HTMLInputElement;
    let value: number = parseInt(inputElement.value, 10);

    if (isNaN(value) || value < 1 || value > 9) {
      inputElement.value = '';
      return;
    }

    if (value == cell.value) {
      cell.isVisible = true;
      this.celleCorrette++;

      if (this.celleCorrette === 81) {
        cell.isVisible = false;
        inputElement.value = '';
        this.resetGame('vittoria', 5);
      }
    } else {
      inputElement.value = '';
      alert('Mossa non valida!');
    }
  }

  private resetGame(e: EsitoGame, p: number): void {
    this.alertService.alert(e);
    setPunteggioOttenuto(p);
    this.sudokuBoard = this.generateCompleteSudoku();
    this.celleCorrette = this.visibleCells;
  }
}
