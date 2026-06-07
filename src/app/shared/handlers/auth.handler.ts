import { finalize, Observable, take, tap } from 'rxjs';
import { handlerFunc } from '../../../library/functions/handler.function';
import { DataHttp } from '../../core/api/http.data';
import {
  Credenziali,
  Iscrizione,
  Profile,
  User,
  UserParams,
} from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';

export function sottoscrizioneUtentiCustom(params: {
  authService: AuthService;
  nextCall: () => void;
}): void {
  handlerFunc<UserParams[]>({
    skipCall: params.authService.users().length > 0,
    callHttp: () => params.authService.getAllUsersHttp(),
    nextCall: (data: UserParams[]) => {
      const user: User | null = DataHttp.user();
      if (user && user.id) {
        params.authService.users.set(
          data.filter((x: UserParams) => x.id !== user.id),
        );
      } else {
        params.authService.users.set(data);
      }
      params.nextCall();
    },
    elseCall: () => params.nextCall(),
  });
}

export function updateUserCustom(params: {
  authService: AuthService;
  user: User;
  finalizeFunc: Function;
  valueContext: boolean;
}): Observable<User> {
  return params.authService.updateUser(params.user, params.valueContext).pipe(
    take(1),
    finalize(() => params.finalizeFunc()),
    tap(() => DataHttp.user.set(params.user)),
  );
}

export function getVoidUser(): User {
  return {
    credenziali: {} as Credenziali,
    profile: {} as Profile,
    iscrizione: {} as Iscrizione,
  } as User;
}
