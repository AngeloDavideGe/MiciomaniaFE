export function boardEmpty<T>(dim: number, emptyCell: T): T[][] {
  let board: T[][] = [];

  for (let i = 0; i < dim; i++) {
    const row: T[] = [];
    for (let j = 0; j < dim; j++) {
      row.push(structuredClone(emptyCell));
    }
    board.push(row);
  }

  return board;
}
