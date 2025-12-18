import { finalize, map, Observable, take } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { User, UserDb, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';
import { mapUserToDb } from './functions/user.function';

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
    })
  );
}
