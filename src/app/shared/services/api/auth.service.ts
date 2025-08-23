import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PostUserForDb,
  User,
  UserParams,
} from '../../interfaces/users.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor() {
    super('DB1');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const params = new HttpParams().set('select', 'id,nome,profilePic,ruolo');

    return this.getCustom<UserParams>('utenti', params);
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User[]> {
    const params = new HttpParams()
      .set('email', `eq.${email}`)
      .set('password', `eq.${password}`);

    return this.getCustom<User>('utenti', params);
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const body: PostUserForDb = {
      nome_input: nome,
      username_input: username,
      email_input: email,
      password_input: password,
    };

    return this.postCustom<PostUserForDb, User>(`rpc/postsignin`, body);
  }

  updateUser(userForDb: any): Observable<User> {
    const params = new HttpParams().set('id', `eq.${userForDb.id}`);

    return this.patchCustom<any, User>(`utenti`, userForDb, params);
  }
}
