import { computed, signal, Signal, WritableSignal } from '@angular/core';

export function GetFiltriCustom<T>(
  elemTable: Signal<T[]>,
  elemForPage: number,
  currentPage: WritableSignal<number>,
  searchQuery?: WritableSignal<string>,
  key?: keyof T,
): FiltriInterface<T> {
  const searcElems = computed<T[]>(() => {
    const elemTot: T[] = elemTable();

    if (searchQuery && key) {
      return elemTot.filter((x: T) => String(x[key]).includes(searchQuery()));
    } else {
      return elemTot;
    }
  });

  const totalPage = computed<number>(() =>
    Math.ceil(searcElems().length / elemForPage),
  );

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searcElems();
    const currentPages: number = currentPage();

    return totElem.slice(
      (currentPages - 1) * elemForPage,
      currentPages * elemForPage,
    );
  });

  const previousPage: Function = () => {
    if (currentPage() > 1) {
      currentPage.update((x: number) => x - 1);
    }
  };

  const nextPage: Function = () => {
    if (currentPage() < totalPage()) {
      currentPage.update((x: number) => x + 1);
    }
  };

  const clearSearch: Function = () => {
    if (searchQuery) {
      searchQuery.set('');
    }
  };

  return {
    searchElems: searcElems,
    totalPage: totalPage,
    elemFilter: elemFilter,
    previousPage: previousPage,
    nextPage: nextPage,
    clearSearch: clearSearch,
  };
}

export interface FiltriInterface<T> {
  totalPage: Signal<number>;
  searchElems: Signal<T[]>;
  elemFilter: Signal<T[]>;
  previousPage: Function;
  nextPage: Function;
  clearSearch: Function;
}
