import { User } from '../../shared/interfaces/users.interface';
import { LangEnum } from '../api/appConfig.service';

export const CURRENT_USER_KEY: string = 'currentUtente';
export const ACCOUNTS_USER_KEY: string = 'accountsUtente';
export const CURRENT_LANG_KEY: string = 'currentLingua';

export function getStoredCurrentUser(): User | null {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}

export function getStoredAccountsUser(): User[] {
  const storedAccounts = localStorage.getItem(ACCOUNTS_USER_KEY);

  if (!storedAccounts) {
    return [];
  }

  try {
    const accounts = JSON.parse(storedAccounts) as unknown;
    return Array.isArray(accounts) ? (accounts as User[]) : [];
  } catch {
    localStorage.removeItem(ACCOUNTS_USER_KEY);
    return [];
  }
}

export function getStoredCurrentLang(): LangEnum {
  const storedLang = localStorage.getItem(CURRENT_LANG_KEY);

  if (!storedLang) {
    return LangEnum.it;
  }

  try {
    const lang: LangEnum = JSON.parse(storedLang);
    let trovato: boolean = false;

    Object.values(LangEnum).forEach((x: LangEnum) => {
      if (x == lang) {
        trovato = true;
      }
    });

    if (trovato) {
      return lang;
    }

    localStorage.removeItem(CURRENT_LANG_KEY);
    return LangEnum.it;
  } catch {
    localStorage.removeItem(CURRENT_LANG_KEY);
    return LangEnum.it;
  }
}
