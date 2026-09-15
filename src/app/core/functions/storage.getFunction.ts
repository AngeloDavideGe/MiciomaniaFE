import { User } from '../../shared/interfaces/users.interface';
import { LangEnum } from '../api/appConfig.service';
import {
  CURRENT_CURSOR_KEY,
  CURRENT_USER_KEY,
  ACCOUNTS_USER_KEY,
  CURRENT_LANG_KEY,
} from './storage.setFunction';

export function getStoredCurrentCursor(): string {
  const storedCursor = localStorage.getItem(CURRENT_CURSOR_KEY);

  if (!storedCursor) {
    return '';
  }

  try {
    return JSON.parse(storedCursor) as string;
  } catch {
    localStorage.removeItem(CURRENT_CURSOR_KEY);
    return '';
  }
}

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
