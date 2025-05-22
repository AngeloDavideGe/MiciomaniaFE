import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
} from 'rxjs';
import { environment } from '../../../environments/environment';

import { UserUtilities } from '../utilities/user-utilities.class';
import { User, UserParams } from '../../pages/auth/interfaces/users.interface';

const userUtilities = new UserUtilities();
const apiUrl = environment.urlDB + 'utenti';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public users: UserParams[] = [];
  public profiliPronti: boolean = false;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable().pipe(shareReplay(1));

  constructor(private http: HttpClient) {
    userUtilities.loadUserFromStorage(this.userSubject, this.users);
    this.profiliPronti = this.users.length > 0;
  }

  get getUser(): User | null {
    return this.userSubject.getValue();
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const params = new HttpParams().set('select', 'id,nome,profilePic,ruolo');

    return this.http.get<UserParams[]>(apiUrl, {
      headers: environment.defaultHeaders,
      params: params,
    });
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User[]> {
    const url = `${apiUrl}?email=eq.${email}&password=eq.${password}`;
    return this.http.get<User[]>(url, { headers: environment.defaultHeaders });
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const url = environment.urlDB + 'rpc/postsignin';
    const body = {
      nome_input: nome,
      username_input: username,
      email_input: email,
      password_input: password,
    };
    return this.http.post<User>(url, body, {
      headers: environment.defaultHeaders,
    });
  }

  updateUser(user: User): Observable<User> {
    const url = `${apiUrl}?id=eq.${user.id}`;
    const userForDb = userUtilities.mapUserToDb(user);
    return this.http
      .patch<User>(url, userForDb, { headers: environment.defaultHeaders })
      .pipe(
        map(() => {
          this.userSubject.next(user);
          userUtilities.saveUserToStorage(user, this.users);
          return user;
        }),
        catchError((error) => {
          console.error("Errore durante l'aggiornamento dell'utente", error);
          throw error;
        })
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getUserByEmailAndPassword(email, password).pipe(
      map((data) => {
        if (data.length === 1) {
          const user = userUtilities.mapUserByDb(data[0]);
          this.users = this.users.filter((x) => x.id != user.id);
          this.userSubject.next(user);
          userUtilities.saveUserToStorage(user, this.users);
          return true;
        } else {
          this.userSubject.next(null);
          userUtilities.removeUserFromStorage();
          return false;
        }
      }),
      catchError((error) => {
        console.error('Errore nel login', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);
    userUtilities.removeUserFromStorage();
  }
}
