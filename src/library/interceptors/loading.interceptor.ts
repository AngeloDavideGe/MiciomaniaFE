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
  handlerFn: HttpHandlerFn,
) => {
  const loadingService = inject(LoadingService);
  const updateLoading = req.context.get(LOADING_CONTEXT);

  if (updateLoading) {
    loadingService.show();
  }

  return handlerFn(req).pipe(
    finalize(() => {
      if (updateLoading) {
        loadingService.hide();
      }
    }),
  );
};
