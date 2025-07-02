import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHandler } from '../../shared/handlers/auth.handler';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authHandler = inject(AuthHandler);

  if (authHandler.user()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authHandler = inject(AuthHandler);

  if (!authHandler.user()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
