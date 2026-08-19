import { User } from '../../shared/interfaces/users.interface';

export const CURRENT_USER_KEY: string = 'currentUtente';
export const ACCOUNTS_USER_KEY: string = 'accountsUtente';

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
