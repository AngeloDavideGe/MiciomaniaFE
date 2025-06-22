import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
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
import { User, UserParams } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  // Utente corrente
  public userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable().pipe(shareReplay(1));
  // Lista di utenti (eccezione per l'utente corrente)
  public usersSubject = new BehaviorSubject<UserParams[]>([]);
  public users$ = this.usersSubject.asObservable().pipe(shareReplay(1));
  // Altri
  public profiliPronti: boolean = false;
  public userMessageMap: { [id: string]: { nome: string; pic: string } } = {};
  private userUtilities = new UserUtilities();

  get getUser(): User | null {
    return this.userSubject.getValue();
  }

  get getUsers(): UserParams[] {
    return this.usersSubject.getValue();
  }

  constructor(private http: HttpClient) {
    this.userUtilities.loadUserFromStorage(this.userSubject, this.getUsers);
    this.profiliPronti = this.getUsers.length > 0;
  }

  ngOnInit(): void {
    this.usersSubjectSubscription();
  }

  private usersSubjectSubscription(): void {
    this.users$.subscribe({
      next: (users) => {
        this.userMessageMap = this.userUtilities.mapUserMessage(users);
      },
    });
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const apiUrl = environment.urlDB + 'utenti';
    const params = new HttpParams().set('select', 'id,nome,profilePic,ruolo');

    return this.http.get<UserParams[]>(apiUrl, {
      headers: environment.headerSupabase,
      params: params,
    });
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User[]> {
    const url = `${environment.urlDB}utenti?email=eq.${email}&password=eq.${password}`;
    return this.http.get<User[]>(url, { headers: environment.headerSupabase });
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
      headers: environment.headerSupabase,
    });
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.urlDB}utenti?id=eq.${user.id}`;
    const userForDb = this.userUtilities.mapUserToDb(user);
    return this.http
      .patch<User>(url, userForDb, { headers: environment.headerSupabase })
      .pipe(
        map(() => {
          this.userSubject.next(user);
          this.userUtilities.saveUserToStorage(user, this.getUsers);
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
          const user = this.userUtilities.mapUserByDb(data[0]);
          this.usersSubject.next(this.getUsers.filter((x) => x.id != user.id));
          this.userSubject.next(user);
          this.userUtilities.saveUserToStorage(user, this.getUsers);
          return true;
        } else {
          this.userSubject.next(null);
          this.userUtilities.removeUserFromStorage();
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
    this.userUtilities.removeUserFromStorage();
  }
}
