import { finalize, map, Observable, take } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { User, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';

export function sottoscrizioneUtenti(params: {
  authService: AuthService;
  elseCall: () => void;
  nextCall: (data: UserParams[]) => void;
}): void {
  if (params.authService.users().length == 0) {
    params.authService.users.set([]);
    params.authService
      .getAllUsersHttp()
      .pipe(take(1))
      .subscribe({
        next: (data: UserParams[]) => params.nextCall(data),
        error: (error) => console.error('errore nella lista utenti', error),
      });
  } else {
    params.elseCall();
  }
}

export function sottoscrizioneUtentiCustom(params: {
  authService: AuthService;
  nextCall: () => void;
}): void {
  if (params.authService.users().length == 0) {
    params.authService.users.set([]);
    params.authService
      .getAllUsersHttp()
      .pipe(take(1))
      .subscribe({
        next: (data: UserParams[]) => {
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
        error: (error) => console.error('errore nella lista utenti', error),
      });
  } else {
    params.nextCall();
  }
}

export function updateUserCustom(params: {
  authService: AuthService;
  user: User;
  finalizeFunc: Function;
}): Observable<User> {
  return params.authService.updateUser(params.user).pipe(
    take(1),
    finalize(() => params.finalizeFunc()),
    map(() => {
      DataHttp.user.set(params.user);
      return params.user;
    }),
  );
}
