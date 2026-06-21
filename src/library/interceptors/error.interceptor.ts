import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorService } from '../dialogs/error.service';
import { ProblemDetails } from '../interfaces/error.interface';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const problem = error.error as ProblemDetails;

      let title = 'Errore';
      let message = 'Si è verificato un errore imprevisto';
      let debugMessage: string | undefined;
      let status = error.status;

      if (problem) {
        title = problem.title ?? title;
        message = problem.detail ?? message;
        status = problem.status ?? status;
        debugMessage = problem.extensions?.['debugMessage'];
      }

      switch (error.status) {
        case 0:
          title = 'Server non raggiungibile';
          message = 'Controlla la connessione internet';
          break;

        case 401:
          title = 'Non autorizzato';
          message = 'Sessione scaduta';
          break;

        case 403:
          title = 'Accesso negato';
          message = 'Non hai permessi sufficienti';
          break;

        case 404:
          title = 'Non trovato';
          message = 'Risorsa non disponibile';
          break;

        case 500:
          title = problem?.title ?? 'Errore server';
          message = problem?.detail ?? message;
          break;
      }

      errorService.showError({
        title,
        message,
        status,
        debugMessage,
      });

      return throwError(() => error);
    }),
  );
};
