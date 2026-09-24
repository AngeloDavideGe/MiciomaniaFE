import { TrisState } from '../models/tris.model';

export function checkForWinnerTris(
  board: TrisState[][],
  player: 'X' | 'O',
): boolean {
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
