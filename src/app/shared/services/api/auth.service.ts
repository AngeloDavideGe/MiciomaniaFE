import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserParams } from '../../interfaces/users.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<User> {
  constructor() {
    super('DB1');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const apiUrl = this.baseUrl + 'utenti';
    const params = new HttpParams().set('select', 'id,nome,profilePic,ruolo');

    return this.http.get<UserParams[]>(apiUrl, {
      headers: this.headers,
      params: params,
    });
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User[]> {
    const url = `${this.baseUrl}utenti?email=eq.${email}&password=eq.${password}`;
    return this.http.get<User[]>(url, { headers: this.headers });
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const url = this.baseUrl + 'rpc/postsignin';
    const body = {
      nome_input: nome,
      username_input: username,
      email_input: email,
      password_input: password,
    };
    return this.http.post<User>(url, body, {
      headers: this.headers,
    });
  }

  updateUser(userForDb: any): Observable<any> {
    const url = `${this.baseUrl}utenti?id=eq.${userForDb.id}`;
    return this.http.patch<User>(url, userForDb, {
      headers: this.headers,
    });
  }
}
