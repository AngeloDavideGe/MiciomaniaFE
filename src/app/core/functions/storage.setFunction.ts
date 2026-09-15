import { AuthService } from '../../shared/services/auth.service';
import { AppConfigService } from '../api/appConfig.service';

export const CURRENT_USER_KEY: string = 'currentUtente';
export const ACCOUNTS_USER_KEY: string = 'accountsUtente';
export const CURRENT_LANG_KEY: string = 'currentLingua';
export const CURRENT_CURSOR_KEY: string = 'currentCursor';

export function setLocalStorage(
  authService: AuthService,
  appConfig: AppConfigService,
): void {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(authService.currentUser()),
  );

  localStorage.setItem(
    ACCOUNTS_USER_KEY,
    JSON.stringify(authService.accountsUser()),
  );

  localStorage.setItem(
    CURRENT_LANG_KEY,
    JSON.stringify(appConfig.currentLang()),
  );

  localStorage.setItem(
    CURRENT_CURSOR_KEY,
    JSON.stringify(appConfig.currentCursor()),
  );
}
