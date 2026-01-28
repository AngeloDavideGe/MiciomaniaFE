export type AdminLangType = { adminLang: AdminLang };

export interface AdminLang {
  // Header Admin
  listaAdminUtenti: string;
  visualizzaRuoli: string;
  // Edit Admin
  nome: string;
  ruolo: string;
  annulla: string;
  salva: string;
  // Table Admin
  vediProfilo: string;
  modifica: string;
  elimina: string;
  nessunUtente: string;
}
