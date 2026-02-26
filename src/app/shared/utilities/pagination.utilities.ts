import { computed, Signal, WritableSignal } from '@angular/core';
import { GetOrderCustom } from '../functions/utilities.function';
import { environment } from '../../../environments/environment';

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
    const elemForPage: number =
      params.elemForPage || environment.maxElement.elemPagine;

    return Math.ceil(search.length / elemForPage);
  });

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searchElems();
    const currentPages: number = params.currentPage ? params.currentPage() : 1;
    const elemForPage: number =
      params.elemForPage || environment.maxElement.elemPagine;

    return totElem.slice(
      (currentPages - 1) * elemForPage,
      currentPages * elemForPage,
    );
  });

  const arrayPage = computed<number[]>(() =>
    Array.from({ length: totalPage() }, (_, i) => i + 1),
  );

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

  const selectPage: Function = (page: number) => {
    if (params.currentPage && page >= 1 && page <= totalPage()) {
      params.currentPage.set(page);
    }
  };

  return {
    searchElems: searchElems,
    totalPage: totalPage,
    elemFilter: elemFilter,
    arrayPage: arrayPage,
    previousPage: previousPage,
    nextPage: nextPage,
    selectPage: selectPage,
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
  arrayPage: Signal<number[]>;
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

interface InputFiltri<T, F> {
  elemTable: Signal<T[]>;
  elemForPage?: number;
  currentPage?: WritableSignal<number>;
  tipoSelect?: 'some' | 'every';
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
  ordinaElem?: WritableSignal<Ordinamento<T, 'desc' | 'cresc'> | null>;
}
