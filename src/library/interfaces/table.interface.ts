import { WritableSignal } from '@angular/core';
import { Ordinamento } from './pagination.interface';

export type OrdinamentoHttp<T> = Ordinamento<T, 'desc' | 'cresc'> | null;
export type RecordColonne<T> = { [K in keyof T]: ColonnaConfig<T, K> };

export interface AzioniTabella<T> {
  icona: string;
  titolo: string;
  azione: (elem: T, index: number) => void;
}

interface ColonnaConfig<T, K extends keyof T> {
  titolo: string;
  lunghezza: string;
  filtro?: WritableSignal<string>;
  sortCol?: boolean;
  formatCell?: (value: T[K]) => string;
}

export interface ChangePageHttp {
  page: number;
  elemForPage: number;
  order: 'desc' | 'cresc' | null;
  orderKey: string | null;
  search: string | null;
  searchKey: string | null;
}
