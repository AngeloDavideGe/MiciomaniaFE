import { computed, Signal, WritableSignal } from '@angular/core';

export function GetFiltriCustom<T>(
  elemTable: Signal<T[]>,
  elemForPage: number,
  currentPage: WritableSignal<number>,
  select?: FiltriSelect<T, string>[],
  tabs?: FiltriSelect<T, boolean | null>,
): FiltriInterface<T> {
  const searcElems = computed<T[]>(() => {
    const elemTot: T[] = elemTable();

    return elemTot.filter(
      (x: T) =>
        (!select ||
          select.every((w: FiltriSelect<T, string>) =>
            String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
          )) &&
        (!tabs || tabs.query() == null || x[tabs.key] == tabs.query()),
    );
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

  return {
    searchElems: searcElems,
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
