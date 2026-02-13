import { computed, Signal, WritableSignal } from '@angular/core';
import { GetOrderCustom } from '../functions/utilities.function';

export function GetFiltriCustom<T, F>(
  params: InputFiltri<T, F>,
): FiltriInterface<T> {
  const RecordFiltri: Record<string, Function> = GetRecordFiltri<T, F>(params);

  const searchElems = computed<T[]>(() => {
    const elemTot: T[] = params.elemTable();
    const ordina = params.ordinaElem ? params.ordinaElem() : null;

    let filter = elemTot.filter(
      (x: T) => RecordFiltri['select'](x) && RecordFiltri['tabs'](x),
    );

    if (ordina) {
      filter = GetOrderCustom(filter, ordina.key, ordina.order == 'desc');
    }

    return filter;
  });

  const totalPage = computed<number>(() => {
    const search: T[] = searchElems();

    return Math.ceil(search.length / (params.elemForPage || 100));
  });

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searchElems();
    const currentPages: number = params.currentPage ? params.currentPage() : 1;

    return totElem.slice(
      (currentPages - 1) * (params.elemForPage || 100),
      currentPages * (params.elemForPage || 100),
    );
  });

  const previousPage: Function = () => {
    if (params.currentPage && params.currentPage() > 1) {
      params.currentPage.update((x: number) => x - 1);
    }
  };

  const nextPage: Function = () => {
    if (params.currentPage && params.currentPage() < totalPage()) {
      params.currentPage.update((x: number) => x + 1);
    }
  };

  return {
    searchElems: searchElems,
    totalPage: totalPage,
    elemFilter: elemFilter,
    previousPage: previousPage,
    nextPage: nextPage,
  };
}

function GetRecordFiltri<T, F>(
  params: InputFiltri<T, F>,
): Record<string, Function> {
  const RecordFiltri: Record<string, Function> = {
    tabs: (x: T) => true,
    select: (x: T) => true,
  };

  if (params.select) {
    if (params.tipoSelect == 'every') {
      RecordFiltri['select'] = (x: T) =>
        params.select!.every((w: FiltriSelect<T, string>) =>
          String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
        );
    } else {
      RecordFiltri['select'] = (x: T) =>
        params.select!.some((w: FiltriSelect<T, string>) =>
          String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
        );
    }
  }

  if (params.tabs) {
    RecordFiltri['tabs'] = (x: T) =>
      params.tabs!.query() == null ||
      x[params.tabs!.key] == params.tabs!.query();
  }

  return RecordFiltri;
}

export interface FiltriInterface<T> {
  totalPage: Signal<number>;
  searchElems: Signal<T[]>;
  elemFilter: Signal<T[]>;
  previousPage: Function;
  nextPage: Function;
}

export interface FiltriSelect<T, F> {
  key: keyof T;
  query: WritableSignal<F>;
}

export interface Ordinamento<T, F> {
  key: keyof T;
  order: F;
}

interface InputFiltri<T, F> {
  elemTable: Signal<T[]>;
  elemForPage?: number;
  currentPage?: WritableSignal<number>;
  tipoSelect?: 'some' | 'every';
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
  ordinaElem?: WritableSignal<Ordinamento<T, 'desc' | 'cresc'> | null>;
}
