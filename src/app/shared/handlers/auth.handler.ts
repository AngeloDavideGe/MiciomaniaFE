import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { User, UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/api/auth.service';
import { mapUserByDb, mapUserToDb } from './functions/user.function';

@Injectable({
  providedIn: 'root',
})
export class AuthHandler {
  public authService = inject(AuthService);

  public user = signal<User | null>(null);
  public users = signal<UserParams[]>([]);

  constructor() {
    this.loadUserFromStorage();
  }

  public sottoscrizioneUtenti(params: {
    nextCall: (data: UserParams[]) => void;
  }): void {
    this.authService
      .getAllUsersHttp()
      .pipe(take(1))
      .subscribe({
        next: (data) => params.nextCall(data),
        error: (error) => console.error('errore nella lista utenti', error),
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

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.set(JSON.parse(userData));
    }

    const usersData = sessionStorage.getItem('users');
    if (usersData) {
      this.users.set(JSON.parse(usersData));
    }
  }
}
