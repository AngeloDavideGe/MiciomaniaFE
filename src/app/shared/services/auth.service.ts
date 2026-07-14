import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADING_CONTEXT } from '../../../library/interceptors/loading.interceptor';
import { BaseService } from '../../../library/services/base.service';
import { Ruolo } from '../enums/users.enum';
import { CronUtenti, User, UserParams } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public currentUserId = signal<string>('');
  public localUsers = signal<User[]>([]);
  public users = signal<UserParams[]>([]);
  public notifiche = signal<CronUtenti[]>([]);

  public usersCaricati: boolean = false;
  public notificheCaricate: boolean = false;

  constructor() {
    super('CS');
  }

  getAllUsersHttp(): Observable<UserParams[]> {
    return this.getCustom<UserParams[]>('Utenti/get_all_utenti');
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.getCustom<User>('Utenti/get_utente_by_email', {
      params: params,
      contextToken: LOADING_CONTEXT,
    });
  }

  getNotifiche(): Observable<CronUtenti[]> {
    const params = new HttpParams().set(
      'maxElems',
      this.appConfig.config.maxElement.notifiche,
    );

    return this.getCustom<CronUtenti[]>('Crono/get_notifiche', {
      params: params,
      contextToken: LOADING_CONTEXT,
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
      contextToken: LOADING_CONTEXT,
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
      contextToken: LOADING_CONTEXT,
      valueContext: valueContext,
    });
  }

  updateRuoloUtente(id: string, ruolo: Ruolo): Observable<void> {
    const body = {
      ruolo: ruolo,
    };

    return this.putCustom<void>(`Utenti/update_ruolo_admin/${id}`, {
      body: body,
      contextToken: LOADING_CONTEXT,
      valueContext: true,
    });
  }
}
