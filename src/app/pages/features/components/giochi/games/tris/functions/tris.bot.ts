import { TrisState } from '../models/tris.model';

export function TrisBotMove(board: TrisState[][]): [number, number] {
  const availableCells: Array<[number, number]> = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        availableCells.push([rowIndex, colIndex]);
      }
    });
  });

  return availableCells[Math.floor(Math.random() * availableCells.length)];
}
