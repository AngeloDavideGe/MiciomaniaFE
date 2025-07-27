import { finalize, Observable, take } from 'rxjs';
import { TabsManga } from '../interfaces/filtri.interface';
import { MangaENome } from '../interfaces/manga.interface';

export function getTabsManga(clickCalls: Function[]): TabsManga[] {
  return [
    {
      class: 'active',
      href: '#tutti',
      color: '#6c5ce7',
      testo: 'Tutti',
      clickCall: clickCalls[0],
    },
    {
      class: '',
      href: '#in-corso',
      color: '#00b894',
      testo: 'In corso',
      clickCall: clickCalls[1],
    },
    {
      class: '',
      href: '#terminati',
      color: '#e84393',
      testo: 'Terminati',
      clickCall: clickCalls[2],
    },
  ];
}

export function loadMangaVolumiENome(params: {
  pathOpera: string;
  loadingFunction: () => void;
  loadVolumiFunc: (pathOpera: string) => Observable<MangaENome>;
  finalizeFunction: () => void;
  nextCallback: (data: MangaENome) => void;
}) {
  params.loadingFunction();

  params
    .loadVolumiFunc(params.pathOpera)
    .pipe(
      take(1),
      finalize(() => params.finalizeFunction())
    )
    .subscribe({
      next: (data) => params.nextCallback(data),
      error: () => console.error('Si è verificato un errore'),
    });
}
