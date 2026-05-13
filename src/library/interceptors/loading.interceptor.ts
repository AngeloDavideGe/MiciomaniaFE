import {
  HttpContextToken,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../dialogs/loading.service';
import { finalize } from 'rxjs';

export const LOADING_CONTEXT = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const loadingService = inject(LoadingService);

  if (req.context.get(LOADING_CONTEXT)) {
    loadingService.show();
  }

  return next(req).pipe(finalize(() => loadingService.hide()));
};
