import { map, Observable, take } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { User, UserDb, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';
import { mapUserToDb } from './functions/user.function';

export function sottoscrizioneUtenti(params: {
  authService: AuthService;
  nextCall: (data: UserParams[]) => void;
}): void {
  params.authService
    .getAllUsersHttp()
    .pipe(take(1))
    .subscribe({
      next: (data: UserParams[]) => params.nextCall(data),
      error: (error) => console.error('errore nella lista utenti', error),
    });
}

export function updateUserCustom(params: {
  authService: AuthService;
  user: User;
}): Observable<User> {
  const userForDb: UserDb = mapUserToDb(params.user);
  return params.authService.updateUser(userForDb).pipe(
    map(() => {
      DataHttp.user.set(params.user);
      return params.user;
    })
  );
}
