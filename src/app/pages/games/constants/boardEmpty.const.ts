import { Forza4, NavaleCell, SudokuCell } from '../interfaces/games.interfaces';

export const navaleCellEmpty: NavaleCell = {
  navePiccola: false,
  naveGrande: false,
  cellaColpita: false,
};

export const sudokuCellEmpty: SudokuCell = {
  value: null,
  isVisible: false,
};

export const forza4CellEmpty: Forza4 = {
  player: false,
  bot: false,
};
