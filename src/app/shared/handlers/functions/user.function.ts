import {
  Credenziali,
  Iscrizione,
  Profile,
  User,
} from '../../interfaces/users.interface';

export function getVoidUser(): User {
  return {
    credenziali: {} as Credenziali,
    profile: {} as Profile,
    iscrizione: {} as Iscrizione,
  } as User;
}
