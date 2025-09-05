import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataHttp } from '../api/http.data';

export const authGuard: CanActivateFn = () => authGuardFunc(true);
export const notAuthGuard: CanActivateFn = () => authGuardFunc(false);

function authGuardFunc(cond: boolean): boolean {
  const router = inject(Router);
  const userBool: boolean = !!DataHttp.user();

  if (userBool == cond) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
}
