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
): Promise<void> {
  // Metodo 1
  try {
    const result: M = await firstValueFrom<M>(callHttpFunc(params));
    params.nextCall?.(result);
  } catch (error: unknown) {
    params.errorCall?.();
  } finally {
    params.completeCall?.();
  }

  //  Metodo 2
  //  return firstValueFrom(callHttpFunc(params))
  //   .then((x: M) => params.nextCall?.(x))
  //   .catch(() => params.errorCall?.())
  //   .finally(()=> params.completeCall?.())
}

function callHttpFunc<T, S, M>(
  params: HandlerInterface<T, S, M>,
): Observable<M> {
  return params.callHttp().pipe(
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
  if (destroy$) {
    return takeUntil(destroy$);
  }

  return take(numTake || 1);
}

interface HandlerInterface<T, S = T, M = S> {
  debounce?: number;
  numTake?: number;
  skipCall?: boolean;
  destroy$?: Subject<void>;
  callHttp: () => Observable<T>;
  switchMapCall?: (value: T) => Observable<S>;
  mapCall?: (value: S) => M;
  finalizeCall?: () => void;
  nextCall?: (value: M) => void;
  errorCall?: (error?: Error) => void;
  completeCall?: () => void;
  elseCall?: () => void;
}
