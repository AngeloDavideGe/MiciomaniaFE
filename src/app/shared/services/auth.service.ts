import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserParams } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAllUsersHttp(): Observable<UserParams[]> {
    const apiUrl = environment.urlDB1 + 'utenti';
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
    const url = `${environment.urlDB1}utenti?email=eq.${email}&password=eq.${password}`;
    return this.http.get<User[]>(url, { headers: environment.headerSupabase });
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const url = environment.urlDB1 + 'rpc/postsignin';
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

  updateUser(userForDb: any): Observable<any> {
    const url = `${environment.urlDB1}utenti?id=eq.${userForDb.id}`;
    return this.http.patch<User>(url, userForDb, {
      headers: environment.headerSupabase,
    });
  }
}
