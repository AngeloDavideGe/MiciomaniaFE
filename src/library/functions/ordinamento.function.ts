export function GetOrderCustom<T>(vett: T[], k: keyof T, desc: boolean): T[] {
  if (vett.length === 0) return vett;

  switch (typeof vett[0][k]) {
    case 'number': {
      if (desc) {
        return vett.sort((a: T, b: T) => (a[k] as number) - (b[k] as number));
      } else {
        return vett.sort((a: T, b: T) => (b[k] as number) - (a[k] as number));
      }
    }
    case 'string': {
      if (desc) {
        return vett.sort((a: T, b: T) =>
          (a[k] as string).localeCompare(b[k] as string),
        );
      } else {
        return vett.sort((a: T, b: T) =>
          (b[k] as string).localeCompare(a[k] as string),
        );
      }
    }
    default:
      return vett;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled: T[] = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
