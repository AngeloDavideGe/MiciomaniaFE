import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, take } from 'rxjs';
import { User, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';
import { ConfirmService } from '../services/template/confirm.service';
import { UserUtilities } from './utilities/user.utilities';
import { UsersUtilities } from './utilities/users.utilities';

@Injectable({
  providedIn: 'root',
})
export class AuthHandler {
  public confirmService = inject(ConfirmService);
  public authService = inject(AuthService);

  private userUtilities = new UserUtilities();
  private usersUtilities = new UsersUtilities();

  public profiliPronti: boolean = false;
  public converUserParams: Function = (user: User): UserParams => {
    return this.usersUtilities.converUserParams(user);
  };
  public getVoidUser: Function = (): User => {
    return this.userUtilities.getVoidUser();
  };

  public user = signal<User | null>(null);
  public users = signal<UserParams[]>([]);
  public userMessageMap: Signal<{
    [id: string]: {
      nome: string;
      pic: string;
    };
  }> = computed(() => this.usersUtilities.mapUserMessage(this.users()));

  constructor() {
    this.userUtilities.loadUserFromStorage(this.user, this.users());
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
          const user = this.userUtilities.mapUserByDb(data[0]);
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
    const userForDb = this.userUtilities.mapUserToDb(user);
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
