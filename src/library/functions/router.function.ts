import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import {
  Observable,
  filter,
  startWith,
  map,
  tap,
  takeUntil,
  Subject,
} from 'rxjs';

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

export function paraMapCustom(routeInput: RouteInput): void {
  routeInput.route.paramMap
    .pipe(takeUntil(routeInput.destroy))
    .subscribe((params: ParamMap) => {
      const id: string = params.get(routeInput.nameParam) || '';
      routeInput.func(id);
    });
}

interface RouterInput {
  router: Router;
  eventName: string;
  mapFunc?: (event: { url: string }) => boolean;
  tapFunc?: (isCurrent: boolean) => void;
}

interface RouteInput {
  route: ActivatedRoute;
  nameParam: string;
  destroy: Subject<void>;
  func: (id: string) => void;
}
