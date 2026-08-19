import { Mappa } from '../../../library/interfaces/svg.interface';

export type GitHubType = Social[] | Conquiste;

export interface Social {
  nome: string;
  descrizione: string;
  icona: string;
  colore: string;
  link: string;
}

export interface Risposta {
  testo: string;
  soluzione: boolean;
}

export interface Conquiste {
  conquistatori: Record<string, string>;
  territori: Record<string, Mappa>;
  muscoli: Record<string, Mappa>;
}

export interface IFooter {
  brand_name: string;
  brand_description: string;
  quick_links: ILink[];
  info_links: ILink[];
  support_links: ILink[];
  copyright_text: string;
}

export interface ILink {
  url: string;
  label: string;
}

export interface MN {
  valore: string | number;
  descrizione: string;
  consiglio: string;
  esempi: string[];
  colore: string;
}
