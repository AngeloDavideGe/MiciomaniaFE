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
  firstValueFrom,
} from 'rxjs';

export function handlerFunc<T, S = T, M = S>(
  params: HandlerInterface<T, S, M>,
): void {
  if (params.skipCall) {
    params.elseCall?.();
    return;
  }

  callHttpFunc(params).subscribe({
    next: (value: M) => params.nextCall?.(value),
    error: (error: Error) => params.errorCall?.(error),
    complete: () => params.completeCall?.(),
  });
}

export async function handlerFuncAsync<T, S = T, M = S>(
  params: HandlerInterface<T, S, M>,
): Promise<M> {
  if (params.skipCall) {
    params.elseCall?.();
    return Promise.resolve({} as M);
  }

  return await firstValueFrom(callHttpFunc(params));
}

function callHttpFunc<T, S, M>(
  params: HandlerInterface<T, S, M>,
): Observable<M> {
  return params.callHttp(params.input).pipe(
    debounceTime(params.debounce || 0),
    getTakeFunc(params.numTake, params.destroy$),
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
  );
}

function getTakeFunc<T>(
  numTake?: number,
  destroy$?: Subject<void>,
): MonoTypeOperatorFunction<T> {
  if (numTake && numTake > 1) {
    return take(numTake);
  } else if (destroy$) {
    return takeUntil(destroy$);
  } else {
    return take(1);
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
