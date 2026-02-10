import { computed, Signal, WritableSignal } from '@angular/core';

export function GetFiltriCustom<T, F>(
  params: InputFiltri<T, F>,
): FiltriInterface<T> {
  const searchElems = computed<T[]>(() => {
    const elemTot: T[] = params.elemTable();

    return elemTot.filter(
      (x: T) =>
        (!params.select ||
          params.select.every((w: FiltriSelect<T, string>) =>
            String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
          )) &&
        (!params.tabs ||
          params.tabs.query() == null ||
          x[params.tabs.key] == params.tabs.query()),
    );
  });

  const totalPage = computed<number>(() =>
    Math.ceil(searchElems().length / (params.elemForPage || 1)),
  );

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searchElems();
    const currentPages: number = params.currentPage ? params.currentPage() : 1;

    return totElem.slice(
      (currentPages - 1) * (params.elemForPage || 1),
      currentPages * (params.elemForPage || 1),
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

interface InputFiltri<T, F> {
  elemTable: Signal<T[]>;
  elemForPage?: number;
  currentPage?: WritableSignal<number>;
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
}
