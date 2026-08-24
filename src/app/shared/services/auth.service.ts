import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADING_CONTEXT } from '../../../library/interceptors/loading.interceptor';
import { BaseMicioService } from './base-micio.service';
import { Ruolo } from '../enums/users.enum';
import {
  CronUtenti,
  User,
  UserParams,
  UserToken,
} from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseMicioService {
  public token = signal<string | null>('');
  public currentUser = signal<User | null>(null);
  public accountsUser = signal<User[]>([]);

  public users = signal<UserParams[]>([]);
  public notifiche = signal<CronUtenti[]>([]);

  public usersCaricati: boolean = false;
  public notificheCaricate: boolean = false;
  public currentUsersCaricati: Record<string, boolean> = {};

  constructor() {
    super('CS');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    return this.getCustom<UserParams[]>('Utenti/get_all_utenti');
  }

  getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Observable<UserToken> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.getCustom<UserToken>('Utenti/get_utente_by_email', {
      params: params,
      contexts: [{ contextToken: LOADING_CONTEXT, value: true }],
    });
  }

  getNotifiche(): Observable<CronUtenti[]> {
    const params = new HttpParams().set(
      'maxElems',
      this.appConfig.config.maxElement.notifiche,
    );

    return this.getCustom<CronUtenti[]>('Crono/get_notifiche', {
      params: params,
    });
  }

  postUser(
    nome: string,
    username: string,
    email: string,
    password: string,
  ): Observable<void> {
    const body = {
      nome: nome,
      username: username.trim(),
      email: email,
      password: password,
    };

    return this.postCustom<void>('Utenti/post_utente', {
      body: body,
      contexts: [{ contextToken: LOADING_CONTEXT, value: true }],
    });
  }

  updateUser(user: User, valueContext: boolean): Observable<any> {
    const getCompleanno: Function = (data: Date) => {
      const date = new Date(data);

      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const body: User = user;

    if (user.profile.compleanno) {
      body.profile.compleanno = getCompleanno(user.profile.compleanno);
    }

    return this.putCustom<any>(`Utenti/update_utente/${user.id}`, {
      body: body,
      contexts: [{ contextToken: LOADING_CONTEXT, value: valueContext }],
    });
  }

  updateRuoloUtente(id: string, ruolo: Ruolo): Observable<void> {
    const body = {
      ruolo: ruolo,
    };

    return this.putCustom<void>(`Utenti/update_ruolo_admin/${id}`, {
      body: body,
      contexts: [{ contextToken: LOADING_CONTEXT, value: true }],
    });
  }
}
