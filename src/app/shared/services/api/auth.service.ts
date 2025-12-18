import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruolo } from '../../enums/users.enum';
import { User, UserParams } from '../../interfaces/users.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public users = signal<UserParams[]>([]);

  constructor() {
    super('BE_CS');
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

  updateUser(user: User): Observable<any> {
    const getCompleanno: Function = (data: Date) => {
      const date = new Date(data);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const body = {
      nome: user.credenziali.nome || '',
      email: user.credenziali.email || '',
      password: user.credenziali.password || '',
      profilePic: user.credenziali.profilePic || '',
      stato: user.iscrizione.stato || '',
      provincia: user.iscrizione.provincia || '',
      bio: user.profile.bio || '',
      telefono: user.profile.telefono || '',
      squadra: user.iscrizione.squadra || '',
      compleanno: getCompleanno(user.profile.compleanno || new Date()),
    };

    return this.putCustom<any>(`Utenti/update_utente/${user.id}`, body);
  }

  updateRuoloUtente(id: string, ruolo: Ruolo): Observable<void> {
    const body = {
      ruolo: ruolo,
    };

    return this.putCustom<void>(`Utenti/update_ruolo_admin/${id}`, body);
  }
}
