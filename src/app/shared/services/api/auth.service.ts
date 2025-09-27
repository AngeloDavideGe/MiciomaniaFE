import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserParams } from '../../interfaces/users.interface';
import { BaseService } from '../base/base.service';
import { Ruolo } from '../../enums/users.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor() {
    super('DB1');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const params = new HttpParams().set('select', 'id,nome,profilePic,ruolo');

    return this.getAllCustom<UserParams>('utenti', params);
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User[]> {
    const params = new HttpParams()
      .set('email', `eq.${email}`)
      .set('password', `eq.${password}`);

    return this.getAllCustom<User>('utenti', params);
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const body = {
      nome_input: nome,
      username_input: username,
      email_input: email,
      password_input: password,
    };

    return this.postCustom<User>(`rpc/postsignin`, body);
  }

  updateUser(userForDb: any): Observable<User> {
    const params = new HttpParams().set('id', `eq.${userForDb.id}`);

    return this.patchCustom<User>(`utenti`, userForDb, params);
  }

  updateRuoloUtente(id: string, ruolo: Ruolo): Observable<User> {
    const body = { ruolo }; // {ruolo: ruolo} - key: value sono uguali
    const params = new HttpParams().set('id', `eq.${id}`);

    return this.patchCustom<User>(`utenti`, body, params);
  }
}
