import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AppConfigService } from '../api/appConfig.service';

export const authGuard: CanActivateFn = () => authGuardFunc(true);
export const notAuthGuard: CanActivateFn = () => authGuardFunc(false);

function authGuardFunc(cond: boolean): boolean {
  const router = inject(Router);
  const authService = inject(AuthService);
  const appConfig = inject(AppConfigService);

  const numUsers: number = authService.accountsUser().length;
  const maxUsers: number = appConfig.config.maxElement.users;

  if (numUsers < maxUsers == cond) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
}
