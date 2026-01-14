export type ElemLangType = { elemLang: ElemLang };

export interface ElemLang {
  // Header Elementi
  titolo: string;
  descrizione1: string;
  descrizione2: string;
  btnTornaIndietro: string;
  // Griglia Elementi
  noManga: string;
  noCanzone: string;
  noProposteSospese: string;
  nonHaiPunti: string;
  inviaProposta: string;
  // Crea Proposta
  modificaProfilo: string;
  tipo: string;
  selezionaTipo: string;
  manga: string;
  canzone: string;
  titoloObbligatorio: string;
  nome: string;
  nomeObbligatorio: string;
  descrizione: string;
  descrizioneObbligatoria: string;
  fileObbligatorio: string;
  fileAccettati: string;
  formatiAccettati: string;
  annulla: string;
  invia: string;
}
