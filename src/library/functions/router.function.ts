import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, startWith, map, tap } from 'rxjs';

export function isCurrentRoute(params: RouterInput): Observable<boolean> {
  return params.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: params.router.url }),
    map(
      (event: { url: string }) =>
        params.mapFunc?.(event) || event.url == params.eventName,
    ),
    tap((isCurrent: boolean) => params.tapFunc?.(isCurrent)),
  );
}

interface RouterInput {
  router: Router;
  eventName: string;
  mapFunc?: (event: { url: string }) => boolean;
  tapFunc?: (isCurrent: boolean) => void;
}
