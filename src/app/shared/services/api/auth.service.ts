import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserDb, UserParams } from '../../interfaces/users.interface';
import { BaseService } from '../base/base.service';
import { Ruolo } from '../../enums/users.enum';
import { mapUserToDb } from '../../handlers/functions/user.function';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor() {
    super('BE');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    const params = new HttpParams();

    return this.getCustom<UserParams[]>('Utenti/get_all_utenti', params);
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.getCustom<User>('Utenti/get_utente_by_email', params);
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const body = {
      nome: nome,
      username: username,
      email: email,
      password: password,
    };

    return this.postCustom<void>('Utenti/post_utente', body);
  }

  updateUser(user: User): Observable<void> {
    const body: UserDb = mapUserToDb(user);

    return this.putCustom<void>(`Utenti/update_utente/${body.id}`, body);
  }

  updateRuoloUtente(id: string, ruolo: Ruolo): Observable<void> {
    const body = {
      ruolo: ruolo,
    };

    return this.putCustom<void>(`Utenti/update_ruolo_admin/${id}`, body);
  }
}
