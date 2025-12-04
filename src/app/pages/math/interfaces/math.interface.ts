export interface SimboliBase {
  costanti: string[];
  funzioni: string[];
  operatori: string[];
  simboliSpeciali: string[];
}

export interface DataOperations {
  operazioni: string[];
  simboliBase: SimboliBase;
  simboliSpeciali: Record<string, string[]>;
}
