import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/api/auth.service';

export const authGuard: CanActivateFn = () => authGuardFunc(true);
export const notAuthGuard: CanActivateFn = () => authGuardFunc(false);

function authGuardFunc(cond: boolean): boolean {
  const router = inject(Router);
  const auth = inject(AuthService);

  const userBool: boolean = auth.currentUserId.length > 0;

  if (userBool == cond) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
}
