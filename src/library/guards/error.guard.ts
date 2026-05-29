import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ErrorService } from '../dialogs/error.service';

export const errorGuard: CanActivateFn = () => {
  const router = inject(Router);
  const errorService = inject(ErrorService);

  if (errorService.error()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
