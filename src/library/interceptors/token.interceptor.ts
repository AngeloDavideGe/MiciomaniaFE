import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  handlerFn: HttpHandlerFn,
) => {
  return handlerFn(
    req.clone({
      withCredentials: true,
    }),
  );
};
