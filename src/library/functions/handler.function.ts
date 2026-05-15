import {
  debounceTime,
  MonoTypeOperatorFunction,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  map,
  finalize,
} from 'rxjs';

export function handlerFunc<T, S = T, M = S>(
  params: HandlerInterface<T, S, M>,
): void {
  if (!params.skipCall) {
    let takeFunc: MonoTypeOperatorFunction<T>;

    if (params.numTake && params.numTake > 1) {
      takeFunc = take(params.numTake);
    } else if (params.destroy$) {
      takeFunc = takeUntil(params.destroy$);
    } else {
      takeFunc = take(1);
    }

    params
      .callHttp(params.input)
      .pipe(
        debounceTime(params.debounce || 0),
        takeFunc,
        switchMap(
          (value: T): Observable<S> =>
            params.switchMapCall
              ? params.switchMapCall(value)
              : of(value as unknown as S),
        ),
        map(
          (value: S): M =>
            params.mapCall ? params.mapCall(value) : (value as unknown as M),
        ),
        finalize(() => params.finalizeCall?.()),
      )
      .subscribe({
        next: (value: M) => params.nextCall?.(value),
        error: (error: Error) => {
          console.error(error);
          params.errorCall?.();
        },
        complete: () => params.completeCall?.(),
      });
  } else {
    params.elseCall?.();
  }
}

interface HandlerInterface<T, S = T, M = S> {
  input?: any;
  skipCall?: boolean;
  debounce?: number;
  numTake?: number;
  destroy$?: Subject<void>;
  callHttp: (input?: any) => Observable<T>;
  switchMapCall?: (value: T) => Observable<S>;
  mapCall?: (value: S) => M;
  nextCall?: (value: M) => void;
  errorCall?: (error?: Error) => void;
  completeCall?: () => void;
  finalizeCall?: () => void;
  elseCall?: () => void;
}
