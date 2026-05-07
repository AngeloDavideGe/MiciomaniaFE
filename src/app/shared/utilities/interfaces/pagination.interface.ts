import { Signal, WritableSignal } from '@angular/core';

export interface FiltriInterface<T> {
  totalPage: Signal<number>;
  searchElems: Signal<T[]>;
  elemFilter: Signal<T[]>;
  currentPage: WritableSignal<number>;
  dettaglioPage: Signal<string>;
  previousPage: Function;
  nextPage: Function;
  selectPage: Function;
}

export interface FiltriSelect<T, F> {
  key: keyof T;
  query: WritableSignal<F>;
}

export interface Ordinamento<T, F> {
  key: keyof T;
  order: F;
}

export interface DataTableHttp<T> {
  elems: WritableSignal<T[]>;
  totalElems: WritableSignal<number>;
}

export interface InputFiltri<T, F> {
  elemTable: Signal<T[]>;
  elemForPage?: WritableSignal<number>;
  totalElemHttp?: Signal<number>;
  tipoSelect?: 'some' | 'every';
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
  ordinaElem?: WritableSignal<Ordinamento<T, 'desc' | 'cresc'> | null>;
}

export interface RaggioPage {
  width: number;
  raggio: number;
}
