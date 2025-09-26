export type ProfiloLangType = { profiloLang: ProfiloLang };

export interface ProfiloLang {
  tornaIndietro: string;
  // New Tweet
  nuovoTweet: string;
  placeholderNT: string;
  buttonAnnullaNT: string;
  // Edit Profilo
  modificaProfilo: string;
  // Tab Info
  nome: string;
  telefono: string;
  compleanno: string;
  // Tab Social + Tab Info
  salva: string;
  chiudi: string;
  // Card Profilo
  noBio: string;
  natoIl: string;
  // Change Pic
  modificaImmagine: string;
  caricaImmagineProfilo: string;
  caricaImmagine: string;
  formatoNonSupportato: string;
  erroreCaricamento: string;
}
