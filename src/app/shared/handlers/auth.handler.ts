import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, take } from 'rxjs';
import { User, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';
import { ConfirmService } from '../services/template/confirm.service';
import {
  getVoidUser,
  loadUserFromStorage,
  mapUserByDb,
  mapUserToDb,
} from './functions/user.function';

@Injectable({
  providedIn: 'root',
})
export class AuthHandler {
  public confirmService = inject(ConfirmService);
  public authService = inject(AuthService);

  public profiliPronti: boolean = false;
  public getVoidUser: Function = (): User => getVoidUser();
  public user = signal<User | null>(null);
  public users = signal<UserParams[]>([]);

  constructor() {
    loadUserFromStorage(this.user, this.users());
    this.profiliPronti = this.users().length > 0;
  }

  public sottoscrizioneUtenti(params: {
    nextCall: (data: UserParams[]) => void;
  }): void {
    this.authService
      .getAllUsersHttp()
      .pipe(
        take(1),
        finalize(() => (this.profiliPronti = true))
      )
      .subscribe({
        next: (data) => params.nextCall(data),
        error: (error) => console.error('errore nella lista utenti', error),
      });
  }

  public confirmCustom(params: {
    titolo: string;
    messaggio: string;
    buttonNo?: string;
    buttonSi?: string;
    confirmFunc: Function;
  }): void {
    this.confirmService
      .confirm({
        title: params.titolo,
        message: params.messaggio,
        buttonNo: params.buttonNo || 'No',
        buttonSi: params.buttonSi || 'Si',
      })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          params.confirmFunc();
        }
      });
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.authService.getUserByEmailAndPassword(email, password).pipe(
      map((data) => {
        if (data.length === 1) {
          const user = mapUserByDb(data[0]);
          this.users.set(this.users().filter((x) => x.id != user.id));
          this.user.set(user);
          return true;
        } else {
          this.user.set(null);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Errore nel login', error);
        return of(false);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const userForDb = mapUserToDb(user);
    return this.authService.updateUser(userForDb).pipe(
      map(() => {
        this.user.set(user);
        return user;
      }),
      catchError((error) => {
        console.error("Errore durante l'aggiornamento dell'utente", error);
        throw error;
      })
    );
  }
}
