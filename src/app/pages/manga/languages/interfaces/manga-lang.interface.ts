export type MangaLangType = { mangaLang: MangaLang };

export interface MangaLang {
  aggiornamento: string;
  // Dettagli Manga
  titolo: string;
  messaggio: string;
  descrizione: string;
  // Filtri Manga
  seleziona: string;
  qualsiasi: string;
  cercaPerNome: string;
  cercaPerAutore: string;
}
