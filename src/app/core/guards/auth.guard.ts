import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataHttp } from '../api/http.data';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (DataHttp.user()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!DataHttp.user()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
