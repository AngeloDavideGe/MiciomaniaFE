import { Signal, WritableSignal } from '@angular/core';

export interface FiltriInterface<T> {
  totalPage: Signal<number>;
  searchElems: Signal<T[]>;
  elemFilter: Signal<T[]>;
  currentPage: WritableSignal<number>;
  currentSlice: WritableSignal<number>;
  dettaglioPage: Signal<string>;
  previousPage: Function;
  nextPage: Function;
  selectPage: Function;
  previousSlice: Function;
  nextSlice: Function;
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
  slice?: TypePagination;
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
  ordinaElem?: WritableSignal<Ordinamento<T, 'desc' | 'cresc'> | null>;
}

export type TypePagination = 'page' | 'single' | 'all';
export type TypeButton = 'Default' | 'Play' | 'Download' | 'No';

export interface RaggioPage {
  width: number;
  raggio: number;
}

export type TipoPaginazione = 'singolo' | 'multiplo';

export interface OtherPage {
  startNumber: boolean;
  startPointer: boolean;
  endPointer: boolean;
  endNumber: boolean;
}
