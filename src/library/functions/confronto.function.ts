export function compareObjectCustom(obj1: any, obj2: any): boolean {
  if (!obj1 || !obj2) return false;
  else return !Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);
}

// Formatta Data
export function formatDataCustom(date: Date): Date {
  date.setMilliseconds(0);
  return date;
}

// Matrice vuota
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

export function drawCasualElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  const randomIndex: number = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
