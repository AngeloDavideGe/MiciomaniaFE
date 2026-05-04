import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GetOrderCustom } from '../../functions/utilities.function';

export function GetFiltriCustom<T, F>(
  params: InputFiltri<T, F>,
): FiltriInterface<T> {
  const currentPage = signal<number>(1);
  const RecordFiltri: Record<string, Function> = GetRecordFiltri<T, F>(params);

  const searchElems = computed<T[]>(() => {
    const elemTot: T[] = params.elemTable();
    const ordina = params.ordinaElem ? params.ordinaElem() : null;
    const totalPageHttp: number | null = params.totalPageHttp
      ? params.totalPageHttp()
      : null;

    if (totalPageHttp !== null) return elemTot;

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

    const totalPageHttp: number | null = params.totalPageHttp
      ? params.totalPageHttp()
      : null;

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : environment.maxElement.elemPagine;

    return totalPageHttp || Math.ceil(search.length / elemForPage);
  });

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searchElems();
    const currentPages: number = currentPage();

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : environment.maxElement.elemPagine;

    const totalPageHttp: number | null = params.totalPageHttp
      ? params.totalPageHttp()
      : null;

    if (totalPageHttp !== null) return totElem;

    return totElem.slice(
      (currentPages - 1) * elemForPage,
      currentPages * elemForPage,
    );
  });

  const arrayPage = computed<number[]>(() =>
    Array.from({ length: totalPage() }, (_, i) => i + 1),
  );

  const dettaglioPage = computed<string>(() => {
    const currentPages: number = currentPage();

    const totalElem: number = params.totalElemHttp
      ? params.totalElemHttp()
      : searchElems().length;

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : environment.maxElement.elemPagine;

    const start: number = Math.max(0, 1 + (currentPages - 1) * elemForPage);
    const end: number = Math.min(start + elemForPage - 1, totalElem);

    if (totalElem < 2) {
      return `${totalElem} elementi`;
    } else {
      return `${start} - ${end} elementi di ${totalElem}`;
    }
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

  const selectPage: Function = (page: number) => {
    if (page >= 1 && page <= totalPage()) {
      currentPage.set(page);
    }
  };

  return {
    searchElems: searchElems,
    totalPage: totalPage,
    elemFilter: elemFilter,
    arrayPage: arrayPage,
    currentPage: currentPage,
    dettaglioPage: dettaglioPage,
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
  totalPages: WritableSignal<number>;
  totalElems: WritableSignal<number>;
}

interface InputFiltri<T, F> {
  elemTable: Signal<T[]>;
  elemForPage?: WritableSignal<number>;
  totalPageHttp?: Signal<number>;
  totalElemHttp?: Signal<number>;
  tipoSelect?: 'some' | 'every';
  select?: FiltriSelect<T, string>[];
  tabs?: FiltriSelect<T, F | null>;
  ordinaElem?: WritableSignal<Ordinamento<T, 'desc' | 'cresc'> | null>;
}
