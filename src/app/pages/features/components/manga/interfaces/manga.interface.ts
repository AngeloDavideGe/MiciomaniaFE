export interface IManga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
}

export interface MangaToolbar {
  icon: string;
  value: string;
  title: string;
}
