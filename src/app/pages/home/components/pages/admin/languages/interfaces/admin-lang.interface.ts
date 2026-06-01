export type AdminLangType = { adminLang: AdminLang };

export interface AdminLang {
  // Edit Admin
  nome: string;
  ruolo: string;
  annulla: string;
  salva: string;
  // Table Admin
  modifica: string;
  nessunUtente: string;
  tuttiGliUtenti: string;
}
