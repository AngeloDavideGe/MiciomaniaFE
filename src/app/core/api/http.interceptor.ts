import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../shared/services/template/loading.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /* -------------------------- */
    this.startIntercept();
    const modifiedReq: HttpRequest<any> = this.modifyRequest(req);

    return next.handle(modifiedReq).pipe(
      finalize(() => this.finalizeCall()),
      catchError((error) => this.errorCall(error))
    );
  }

  private startIntercept(): void {
    this.count++;
    if (this.count === 1) {
      this.loadingService.show();
    }
  }

  private modifyRequest(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ headers: environment.headerSupabase1 });
  }

  private finalizeCall(): void {
    this.count--;
    if (this.count === 0) {
      this.loadingService.hide();
    }
  }

  private errorCall(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    throw error;
  }
}
